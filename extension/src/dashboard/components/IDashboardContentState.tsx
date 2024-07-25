import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IDashboardEnvironmentColumn, IPipelineInfo } from '../api/types'

export interface IDashboardContentState {
    pipelines?: ArrayItemProvider<IPipelineInfo>
    columns: IDashboardEnvironmentColumn[]
    isLoading: boolean
    organisation?: string
    project?: string
}
