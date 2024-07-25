import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IDashboardEnvironmentColumn } from '../api/types'

export interface IDashboardContentState {
    pipelines?: ArrayItemProvider<any>
    columns: IDashboardEnvironmentColumn[]
    isLoading: boolean
    organisation?: string
    project?: string
}
