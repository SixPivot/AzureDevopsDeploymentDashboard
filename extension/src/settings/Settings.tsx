import * as React from 'react'
import ReactDOM from 'react-dom'
import { ExtensionDataKeys, IDevOpsProjectInfo, IEnvironmentInstance, ISettingsContentState } from '../types'
import { ITableColumn, SimpleTableCell, TableColumnLayout } from 'azure-devops-ui/Table'
import { ObservableValue } from 'azure-devops-ui/Core/Observable'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { merge } from '../utilities'
import { BoltListDragEvent, IListDropData } from 'azure-devops-ui/List'
import { getEnvironmentsSortedByConvention } from '../api/AzureDevopsClient'
import { initAzureDevOpsSdk } from '../api/AzureDevOpsSdkManager'
import { SettingsContent } from './SettingsContent'

export class Settings extends React.Component<{}, ISettingsContentState> {
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

    private _projectInfo?: IDevOpsProjectInfo

    public async componentDidMount() {
        this._projectInfo = await initAzureDevOpsSdk()

        const originalEnvironments = await getEnvironmentsSortedByConvention(this._projectInfo.name)

        const environments =
            (await this._projectInfo.extensionDataManager.getValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments)) ?? []

        this.setState({
            environments: new ArrayItemProvider(merge(originalEnvironments, environments)),
            isLoading: false,
            projectInfo: this._projectInfo,
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
        const dataManager = this._projectInfo?.extensionDataManager
        if (dataManager) {
            this.setState({ isLoading: true })
            await dataManager.setValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments, this.state.environments.value)
            this.setState({ isLoading: false })
        }
    }

    onResetToDefaultSortOrder = async () => {
        const dataManager = this._projectInfo?.extensionDataManager
        if (dataManager) {
            this.setState({ isLoading: true })
            await dataManager.setValue(ExtensionDataKeys.Environments, undefined)
            const environments = await getEnvironmentsSortedByConvention(this._projectInfo?.name ?? '')
            this.setState({ isLoading: false, environments: new ArrayItemProvider(environments) })
        }
    }

    public render(): JSX.Element {
        return <SettingsContent state={this.state} />
    }
}

ReactDOM.render(<Settings />, document.getElementById('root'))
