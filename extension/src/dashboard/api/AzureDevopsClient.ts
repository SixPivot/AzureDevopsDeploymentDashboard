import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { getClient } from 'azure-devops-extension-api'
import { PipelinesRestClient } from 'azure-devops-extension-api/Pipelines/PipelinesClient'
import { TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent'
import { DashboardEnvironmentPipelineInfo, EnvironmentPipelines, PipelineInfo } from './types'

const project = 'ReleaseDashboard'
export async function getPipelines(): Promise<DashboardEnvironmentPipelineInfo> {
    const taskAgentClient = getClient(TaskAgentRestClient)
    const pipelinesClient = getClient(PipelinesRestClient)

    const [pipelines, environments] = await Promise.all([pipelinesClient.listPipelines(project), taskAgentClient.getEnvironments(project)])

    const environmentPipelines: EnvironmentPipelines[] = []
    for (const environment of environments) {
        const deployments = await taskAgentClient.getEnvironmentDeploymentExecutionRecords(project, environment.id)

        const environmentPipeline: EnvironmentPipelines = {
            name: environment.name,
            pipelines: {},
        }
        for (const deployment of deployments) {
            if (!environmentPipeline.pipelines[deployment.definition.name]) {
                const pipeline = pipelines.find((p) => p.id == deployment.definition.id)
                environmentPipeline.pipelines[deployment.definition.name] = {
                    deployment: deployment,
                    pipeline: pipeline,
                }
            }
        }
        environmentPipelines.push(environmentPipeline)
    }

    const rows = generateRows(environmentPipelines)
    return {
        environments: environmentPipelines,
        pipelines: new ArrayItemProvider(rows),
    }
}

function generateRows(environments: EnvironmentPipelines[]): Array<PipelineInfo> {
    const rows: Array<PipelineInfo> = []

    for (const environment of environments) {
        for (const pipelineName of Object.keys(environment.pipelines)) {
            let row = rows.find((pr) => pr.name == pipelineName)

            if (!row) {
                row = {
                    name: pipelineName,
                    environments: {},
                    uri: environment.pipelines[pipelineName].deployment.definition._links['web'].href,
                }
                rows.push(row)
            }

            row.environments[environment.name] = {
                value: environment.pipelines[pipelineName].deployment.owner.name,
                finishTime: environment.pipelines[pipelineName].deployment.finishTime,
                result: environment.pipelines[pipelineName].deployment.result,
                folder: environment.pipelines[pipelineName].pipeline?.folder,
                uri: environment.pipelines[pipelineName].deployment.owner?._links['web'].href,
            }
        }
    }

    return rows
}
