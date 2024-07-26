import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IDashboardEnvironmentColumn, IPipelineInstance } from '../api/types'

export interface IDashboardContentState {
    pipelines?: ArrayItemProvider<IPipelineInstance>
    columns: IDashboardEnvironmentColumn[]
    isLoading: boolean
    organisation?: string
    project?: string
}
