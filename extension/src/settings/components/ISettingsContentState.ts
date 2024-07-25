import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IEnvironmentInstance } from '../api/types'
import { ITableColumn } from 'azure-devops-ui/Table'

export interface ISettingsContentState {
    columns: ITableColumn<IEnvironmentInstance>[]
    environments?: ArrayItemProvider<IEnvironmentInstance>
    project?: string
    organisation?: string
    isLoading: boolean
}
