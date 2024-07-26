/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IProjectPageService } from 'azure-devops-extension-api'
import { ITableColumn, SimpleTableCell, TableColumnLayout } from 'azure-devops-ui/Table'
import { ObservableValue } from 'azure-devops-ui/Core/Observable'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { BoltListDragEvent, IListDropData } from 'azure-devops-ui/List'
import { getEnvironmentsSortedByConvention } from '../api/AzureDevOpsClient'
import { ISettingsContentState } from './ISettingsContentState'
import { IEnvironmentInstance } from '../../api/types'
import { ExtensionDataManagerWrapper } from '../../api/ExtensionDataManagerWrapper'
import { MainContent } from './main-content'
import './main.scss'

export class Main extends React.Component<{}, ISettingsContentState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            columns: [
                {
                    columnLayout: TableColumnLayout.singleLine,
                    id: 'environmentName',
                    name: 'Environment name',
                    readonly: true,
                    renderCell: this.renderEnvironmentNameCell,
                    width: new ObservableValue(-30),
                },
            ],
            environments: new ArrayItemProvider<IEnvironmentInstance>([]),
            isLoading: true,
            onSaveCustomSortOrder: this.onSaveCustomSortOrder,
            onResetToDefaultSortOrder: this.onResetToDefaultSortOrder,
        }
        this._dataManager = new ExtensionDataManagerWrapper()
    }

    private readonly _dataManager: ExtensionDataManagerWrapper

    public async componentDidMount() {
        await SDK.init()
        await this._dataManager.init()

        const projectPageService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService)
        const project = await projectPageService.getProject()
        const projectName = project?.name ?? ''

        const environments = await getEnvironmentsSortedByConvention(projectName)
        const manuallySortedEnvironments = await this._dataManager.getCustomEnvironmentSortOrder()

        this.setState({
            environments: new ArrayItemProvider(manuallySortedEnvironments ?? environments),
            isLoading: false,
            organisation: SDK.getHost().name,
            project: projectName,
            onTableRowDrop: this.onTableRowDrop,
        })
    }

    renderEnvironmentNameCell = (
        _rowIndex: number,
        columnIndex: number,
        tableColumn: ITableColumn<IEnvironmentInstance>,
        tableItem: IEnvironmentInstance
    ): JSX.Element => {
        return (
            <SimpleTableCell
                columnIndex={columnIndex}
                tableColumn={tableColumn}
                key={'col-' + columnIndex}
                contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m"
            >
                {tableItem.name}
            </SimpleTableCell>
        )
    }

    onTableRowDrop = (event: BoltListDragEvent<HTMLElement, IEnvironmentInstance>, dropData: IListDropData) => {
        const draggedItem = event.detail.dataTransfer.data
        const dragIndex = event.detail.dataTransfer.secondaryData?.index

        //Strange behavior between dragging up and dragging down
        const dropIndex = dragIndex !== undefined && dragIndex < dropData.index ? dropData.index - 1 : dropData.index

        const items = this.state.environments?.value
        if (dragIndex !== undefined) {
            // Remove the dragged item from its original position
            items.splice(dragIndex, 1)

            // Insert the dragged item at the new position
            items.splice(dropIndex, 0, draggedItem)
            this.setState({
                environments: new ArrayItemProvider(items),
            })
        }
    }

    onSaveCustomSortOrder = async () => {
        if (this._dataManager) {
            this.setState({ isLoading: true })
            await this._dataManager.setCustomEnvironmentSortOrder(this.state.environments.value)
            this.setState({ isLoading: false })
        }
    }

    onResetToDefaultSortOrder = async () => {
        if (this._dataManager) {
            this.setState({ isLoading: true })
            await this._dataManager.clearCustomEnviromentsSortOrder()
            const environments = await getEnvironmentsSortedByConvention(this._dataManager.getProjectName())
            this.setState({ isLoading: false, environments: new ArrayItemProvider(environments) })
        }
    }

    public render(): JSX.Element {
        return <MainContent state={this.state} />
    }
}
