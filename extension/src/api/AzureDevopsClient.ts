import { getClient } from 'azure-devops-extension-api'
import { PipelinesRestClient } from 'azure-devops-extension-api/Pipelines/PipelinesClient'
import { EnvironmentInstance, TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent'
import { IEnvironmentPipelines, IEnvironmentInstance, IDevOpsProjectInfo, ExtensionDataKeys } from '../types'
import { merge, sortByConvention } from '../utilities'

export async function getSortedEnvironments(projectInfo: IDevOpsProjectInfo): Promise<EnvironmentInstance[]> {
    const settings = (await projectInfo.extensionDataManager.getValue<EnvironmentInstance[]>(ExtensionDataKeys.Environments)) ?? []
    const taskAgentClient = getClient(TaskAgentRestClient)
    const environments = await taskAgentClient.getEnvironments(projectInfo.name)

    const sortedEnvironments: EnvironmentInstance[] =
        settings
            ?.map((x) => environments.find((e) => e.name === x.name))
            .filter((x) => x)
            .map((x) => x!) ?? []
    const convention = sortByConvention(environments)
    return (merge(convention, sortedEnvironments) ?? convention) as EnvironmentInstance[]
}

export async function getDashboardEnvironmentPipeline(projectInfo: IDevOpsProjectInfo): Promise<IEnvironmentPipelines[]> {
    const taskAgentClient = getClient(TaskAgentRestClient)
    const pipelinesClient = getClient(PipelinesRestClient)

    const [pipelines, environments] = await Promise.all([
        pipelinesClient.listPipelines(projectInfo.name, 'name asc', 1000),
        getSortedEnvironments(projectInfo),
    ])

    const environmentPipelines: IEnvironmentPipelines[] = []
    for (const environment of environments) {
        const deployments = await taskAgentClient.getEnvironmentDeploymentExecutionRecords(projectInfo.name, environment.id)
        const environmentPipeline: IEnvironmentPipelines = {
            name: environment.name,
            pipeline: {},
        }
        for (const deployment of deployments) {
            const pipeline = pipelines.find((p) => p.id == deployment.definition.id)

            // Pipelines that are removed may still have deployments, but we don't want to show them.
            if (pipeline) {
                if (!environmentPipeline.pipeline[pipeline.name]) {
                    environmentPipeline.pipeline[pipeline.name] = {
                        deployment: deployment,
                        pipeline: pipeline,
                    }
                }
            }
        }
        environmentPipelines.push(environmentPipeline)
    }

    return environmentPipelines
}

/**
 * Fetches environments from pipelines
 * @param projectName : project name
 * @returns Promise: Array of IEnvironmentInstance
 */
export async function getEnvironmentsSortedByConvention(projectName: string): Promise<IEnvironmentInstance[]> {
    const taskAgentClient = getClient(TaskAgentRestClient)

    const environments = (await taskAgentClient.getEnvironments(projectName)).map((i) => {
        return {
            name: i.name,
        } as IEnvironmentInstance
    })
    return sortByConvention(environments) as IEnvironmentInstance[]
}
