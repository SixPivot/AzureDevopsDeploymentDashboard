import { EnvironmentDeploymentExecutionRecord, TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent'
import { getDashboardEnvironmentPipeline } from './api/AzureDevopsClient'
import { initAzureDevOpsSdk } from './api/AzureDevOpsSdkManager'
import { ExtensionDataKeys, IEnvironmentInstance } from './types'
import { PipelinesRestClient } from 'azure-devops-extension-api/Pipelines/PipelinesClient'
import { getClient } from 'azure-devops-extension-api'

export const diagnostics = async () => {
    // Get browser data.
    const browser = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        online: navigator.onLine,
    }

    // Get the same models as the dashboard.
    const projectInfo = await initAzureDevOpsSdk()
    const { environments, pipelines } = await getDashboardEnvironmentPipeline(projectInfo.name)
    const sortedEnvironments =
        (await projectInfo.extensionDataManager.getValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments)) ?? []

    // Get raw data for comparison to dashboard model.
    const taskAgentClient = getClient(TaskAgentRestClient)
    const pipelinesClient = getClient(PipelinesRestClient)

    const [rawPipelines, rawEnvironments] = await Promise.all([
        pipelinesClient.listPipelines(projectInfo.name, 'name asc', 1000),
        taskAgentClient.getEnvironments(projectInfo.name),
    ])

    let rawDeployments: EnvironmentDeploymentExecutionRecord[] = []
    for (const environment of rawEnvironments) {
        const deployments = await taskAgentClient.getEnvironmentDeploymentExecutionRecords(
            projectInfo.name,
            environment.id,
            undefined,
            1000
        )
        rawDeployments = [...rawDeployments, ...deployments]
    }

    const rawData = {
        environments: rawEnvironments,
        pipelines: rawPipelines,
        deployments: rawDeployments,
    }

    const data = {
        projectInfo,
        environments,
        pipelines,
        sortedEnvironments,
        browser,
        raw: rawData,
    }

    return data
}
