import { EnvironmentDeploymentExecutionRecord, TaskResult } from 'azure-devops-extension-api/TaskAgent'
import { Pipeline } from 'azure-devops-extension-api/Pipelines/Pipelines'
import { ISimpleTableCell, ITableColumn } from 'azure-devops-ui/Table'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IStatusProps } from 'azure-devops-ui/Status'
import { IEnvironmentInstance } from '../../api/types'

/**
 Type represents deployment pipelines (pipelines used for deployment. Usually these are YAML pipelines with deployment environments)
 */
export interface IDeploymentPipeline {
    [key: string]: {
        deployment: EnvironmentDeploymentExecutionRecord
        pipeline: Pipeline | undefined
    }
}

/**
 Type represents environment pipelines (environment with associated deployment pipelines)
 */
export interface IEnvironmentPipelines extends IEnvironmentInstance {
    pipeline: IDeploymentPipeline
}

export interface IStatusIndicatorData {
    statusProps: IStatusProps
    label: string
}

export interface IDashboardEnvironmentColumn extends ITableColumn<IPipelineInstance>, IEnvironmentInstance {}

/**
Type represents release information
*/
export interface IDeploymentInstance {
    value: string
    result: TaskResult
    folder?: string
    finishTime: Date
    uri: string
}

/**
Type represents dictionary of releases (ReleaseInfo}. Where dictionary key is environment name and value is ReleaseInfo
Example: {Dev: { value: "20240715.2", finishTime: "1 Jul 2024, 01:37 PM", result: 0}} Where Dev is environment name. And dynamically added as dictionary key
*/
export interface IEnvironmentDeploymentDictionary {
    [index: string]: IDeploymentInstance
}

/**
Type represents Pipeline information and environments associated with this pipeline
*/
export interface IPipelineInstance {
    key: string
    name: string
    uri: string
    environments: IEnvironmentDeploymentDictionary
}

/**
 Type represents Dashboard information (environments vs pipelines = release) 
 */
export interface IDashboardEnvironmentPipeline {
    environments: IEnvironmentPipelines[]
    pipelines: ArrayItemProvider<IPipelineInstance>
}

/**
 Type represents folder / pipeline information item for tree view
 */
export type IDeploymentTableItem = {
    [P in keyof ISimpleTableCell]: ISimpleTableCell[P]
} & {
    pipeline: IPipelineInstance
    name: string
}
