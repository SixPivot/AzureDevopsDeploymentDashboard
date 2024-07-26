import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { ITableColumn } from 'azure-devops-ui/Table'
import { BoltListDragEvent, IListDropData } from 'azure-devops-ui/List'
import { IEnvironmentInstance } from '../../api/types'

export interface ISettingsContentState {
    columns: ITableColumn<IEnvironmentInstance>[]
    environments: ArrayItemProvider<IEnvironmentInstance>
    project?: string
    organisation?: string
    isLoading: boolean
    onTableRowDrop?: (event: BoltListDragEvent<HTMLElement, IEnvironmentInstance>, dropData: IListDropData) => void
    onSaveCustomSortOrder: () => void
    onResetToDefaultSortOrder: () => void
}
