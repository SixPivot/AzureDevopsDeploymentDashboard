import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { getClient } from 'azure-devops-extension-api'
import { PipelinesRestClient } from 'azure-devops-extension-api/Pipelines/PipelinesClient'
import { TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent'
import { DashboardEnvironmentPipelineInfo, EnvironmentPipelines, EnvironmentReleaseDictionary, PipelineInfo } from './types'

export async function getDashboardEnvironmentPipelineInfo(projectName: string): Promise<DashboardEnvironmentPipelineInfo> {
    const taskAgentClient = getClient(TaskAgentRestClient)
    const pipelinesClient = getClient(PipelinesRestClient)

    const [pipelines, environments] = await Promise.all([
        pipelinesClient.listPipelines(projectName),
        taskAgentClient.getEnvironments(projectName),
    ])

    const environmentPipelines: EnvironmentPipelines[] = []
    for (const environment of environments) {
        const deployments = await taskAgentClient.getEnvironmentDeploymentExecutionRecords(projectName, environment.id)

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

    const pipelineInfoArray = generatePipelineInfoArray(environmentPipelines)
    return {
        environments: environmentPipelines,
        pipelines: new ArrayItemProvider(pipelineInfoArray),
    }
}

function generatePipelineInfoArray(environments: EnvironmentPipelines[]): Array<PipelineInfo> {
    const pipelineInfoArray: Array<PipelineInfo> = []

    for (const environment of environments) {
        for (const pipelineName of Object.keys(environment.pipelines)) {
            const pipelineInfo = pipelineInfoArray.find((pr) => pr.name == pipelineName) ?? {
                name: pipelineName,
                environments: {} as EnvironmentReleaseDictionary,
                uri: environment.pipelines[pipelineName].deployment.definition._links['web'].href,
            }

            if (pipelineInfoArray.indexOf(pipelineInfo) === -1) {
                pipelineInfoArray.push(pipelineInfo)
            }

            pipelineInfo.environments[environment.name] = {
                value: environment.pipelines[pipelineName].deployment.owner.name,
                finishTime: environment.pipelines[pipelineName].deployment.finishTime,
                result: environment.pipelines[pipelineName].deployment.result,
                folder: environment.pipelines[pipelineName].pipeline?.folder,
                uri: environment.pipelines[pipelineName].deployment.owner?._links['web'].href,
            }
        }
    }

    return pipelineInfoArray
}
