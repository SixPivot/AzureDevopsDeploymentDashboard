import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { getClient } from 'azure-devops-extension-api'
import { PipelinesRestClient } from 'azure-devops-extension-api/Pipelines/PipelinesClient'
import { TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent'
import { IDashboardEnvironmentPipelineInfo, IEnvironmentPipelines, IEnvironmentReleaseDictionary, IPipelineInfo } from './types'

export async function getDashboardEnvironmentPipelineInfo(projectName: string): Promise<IDashboardEnvironmentPipelineInfo> {
    const taskAgentClient = getClient(TaskAgentRestClient)
    const pipelinesClient = getClient(PipelinesRestClient)

    const [pipelines, environments] = await Promise.all([
        pipelinesClient.listPipelines(projectName),
        taskAgentClient.getEnvironments(projectName),
    ])

    const environmentPipelines: IEnvironmentPipelines[] = []
    for (const environment of environments) {
        const deployments = await taskAgentClient.getEnvironmentDeploymentExecutionRecords(projectName, environment.id)

        const environmentPipeline: IEnvironmentPipelines = {
            name: environment.name,
            pipeline: {},
        }
        for (const deployment of deployments) {
            if (!environmentPipeline.pipeline[deployment.definition.name]) {
                const pipeline = pipelines.find((p) => p.id == deployment.definition.id)
                environmentPipeline.pipeline[deployment.definition.name] = {
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

function generatePipelineInfoArray(environments: IEnvironmentPipelines[]): Array<IPipelineInfo> {
    const pipelineInfoArray: Array<IPipelineInfo> = []

    for (const environment of environments) {
        for (const key of Object.keys(environment.pipeline)) {
            const pipelineInfo = pipelineInfoArray.find((pr) => pr.key == key) ?? {
                key: key,
                name: environment.pipeline[key].pipeline?.name ?? '',
                environments: {} as IEnvironmentReleaseDictionary,
                uri: environment.pipeline[key].deployment.definition._links['web'].href,
            }

            if (pipelineInfoArray.indexOf(pipelineInfo) === -1) {
                pipelineInfoArray.push(pipelineInfo)
            }

            pipelineInfo.environments[environment.name] = {
                value: environment.pipeline[key].deployment.owner.name,
                finishTime: environment.pipeline[key].deployment.finishTime,
                result: environment.pipeline[key].deployment.result,
                folder: environment.pipeline[key].pipeline?.folder,
                uri: environment.pipeline[key].deployment.owner?._links['web'].href,
            }
        }
    }

    return pipelineInfoArray
}
