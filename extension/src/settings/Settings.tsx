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

async function load(): Promise<{ environments: ArrayItemProvider<IEnvironmentInstance>; projectInfo: IDevOpsProjectInfo }> {
    var _projectInfo = await initAzureDevOpsSdk()

    const originalEnvironments = await getEnvironmentsSortedByConvention(_projectInfo.name)

    const environments = (await _projectInfo.extensionDataManager.getValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments)) ?? []

    return {
        environments: new ArrayItemProvider(merge(originalEnvironments, environments)),
        projectInfo: _projectInfo,
    }
}

const Settings = () => {
    const renderEnvironmentNameCell = (
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

    const onTableRowDrop = (event: BoltListDragEvent<HTMLElement, IEnvironmentInstance>, dropData: IListDropData) => {
        const draggedItem = event.detail.dataTransfer.data
        const dragIndex = event.detail.dataTransfer.secondaryData?.index

        //Strange behavior between dragging up and dragging down
        const dropIndex = dragIndex !== undefined && dragIndex < dropData.index ? dropData.index - 1 : dropData.index

        const items = state.environments?.value
        if (dragIndex !== undefined) {
            // Remove the dragged item from its original position
            items.splice(dragIndex, 1)

            // Insert the dragged item at the new position
            items.splice(dropIndex, 0, draggedItem)
            setState({
                ...state,
                environments: new ArrayItemProvider(items),
            })
        }
    }

    const onSaveCustomSortOrder = async () => {
        const dataManager = state.projectInfo?.extensionDataManager
        if (dataManager) {
            setState({
                ...state,
                isLoading: true,
            })
            await dataManager.setValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments, state.environments.value)
            setState({
                ...state,
                isLoading: false,
            })
        }
    }

    const onResetToDefaultSortOrder = async () => {
        const dataManager = state.projectInfo?.extensionDataManager
        if (dataManager) {
            setState({
                ...state,
                isLoading: true,
            })
            await dataManager.setValue(ExtensionDataKeys.Environments, undefined)
            const environments = await getEnvironmentsSortedByConvention(state.projectInfo?.name ?? '')
            setState({
                ...state,
                isLoading: false,
                environments: new ArrayItemProvider(environments),
            })
        }
    }
    const [state, setState] = React.useState<ISettingsContentState>({
        columns: [
            {
                columnLayout: TableColumnLayout.singleLine,
                id: 'environmentName',
                name: 'Environment name',
                readonly: true,
                renderCell: renderEnvironmentNameCell,
                width: new ObservableValue(-30),
            },
        ],
        environments: new ArrayItemProvider<IEnvironmentInstance>([]),
        isLoading: true,
    })

    React.useEffect(() => {
        load()
            .then(({ projectInfo, environments }) =>
                setState({
                    ...state,
                    environments,
                    projectInfo,
                    isLoading: false,
                })
            )
            .catch((err) => {
                throw err
            })
    }, [])

    return (
        <SettingsContent
            state={state}
            onTableRowDrop={onTableRowDrop}
            onResetToDefaultSortOrder={onResetToDefaultSortOrder}
            onSaveCustomSortOrder={onSaveCustomSortOrder}
        />
    )
}

ReactDOM.render(<Settings />, document.getElementById('root'))
