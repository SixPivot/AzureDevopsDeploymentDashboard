/// <reference types="vss-web-extension-sdk" />
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IExtensionDataService, IProjectPageService } from 'azure-devops-extension-api'
import { ContributionIds, IDevOpsProjectInfo } from '../types'

export async function initAzureDevOpsSdk(): Promise<IDevOpsProjectInfo> {
    await SDK.init()
    const accessToken = await SDK.getAccessToken()
    const [extDataService, projectPageService] = await Promise.all([
        SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService),
        SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService),
    ])

    const extensionId = SDK.getExtensionContext().id
    const projectService = await projectPageService.getProject()
    const project = projectService?.name ?? ''
    const organization = SDK.getHost().name
    const extensionDataManager = await extDataService.getExtensionDataManager(extensionId, accessToken)
    const projectUri = `https://dev.azure.com/${organization}/${project}`

    return {
        name: project,
        organization: organization,
        extensionId: extensionId,
        extensionDataManager: extensionDataManager,
        projectUri: projectUri,
        pipelinesUri: `${projectUri}/_build/`,
        settingsUri: `${projectUri}/_settings/${extensionId}.${ContributionIds.DeploymentDashboardSettings}`,
        deploymentDashboardUri: `${projectUri}/_apps/hub/${extensionId}.${ContributionIds.DeploymentDashboard}`,
    }
}
