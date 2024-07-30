/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import { ITableColumn, SimpleTableCell, TableColumnLayout } from 'azure-devops-ui/Table'
import { IExtensionDataManager } from 'azure-devops-extension-api'
import { ObservableValue } from 'azure-devops-ui/Core/Observable'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { BoltListDragEvent, IListDropData } from 'azure-devops-ui/List'
import { ExtensionDataKeys, IEnvironmentInstance, ISettingsContentState } from '../types'
import { initAzureDevOpsSdk } from '../api/AzureDevOpsSdkManager'
import { MainContent } from './MainContent'
import { merge } from '../utilities'
import './main.scss'
import { getEnvironmentsSortedByConvention } from '../api/AzureDevopsClient'

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
    }

    private _extensionDataManager?: IExtensionDataManager
    private _projectName?: string

    public async componentDidMount() {
        const { project, organization, extensionDataManager } = await initAzureDevOpsSdk()
        this._extensionDataManager = extensionDataManager
        this._projectName = project
        const originalEnvironments = await getEnvironmentsSortedByConvention(project)

        const environments = (await extensionDataManager.getValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments)) ?? []

        this.setState({
            environments: new ArrayItemProvider(merge(originalEnvironments, environments)),
            isLoading: false,
            organisation: organization,
            project: project,
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
        if (this._extensionDataManager) {
            this.setState({ isLoading: true })
            await this._extensionDataManager.setValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments, this.state.environments.value)
            this.setState({ isLoading: false })
        }
    }

    onResetToDefaultSortOrder = async () => {
        if (this._extensionDataManager) {
            this.setState({ isLoading: true })
            await this._extensionDataManager.setValue(ExtensionDataKeys.Environments, undefined)
            const environments = await getEnvironmentsSortedByConvention(this._projectName ?? '')
            this.setState({ isLoading: false, environments: new ArrayItemProvider(environments) })
        }
    }

    public render(): JSX.Element {
        return <MainContent state={this.state} />
    }
}
