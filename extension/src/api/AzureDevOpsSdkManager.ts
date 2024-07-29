/// <reference types="vss-web-extension-sdk" />
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IExtensionDataService, IExtensionDataManager, IProjectPageService } from 'azure-devops-extension-api'

export async function initAzureDevOpsSdk(): Promise<{
    project: string
    organization: string
    extensionDataManager: IExtensionDataManager
}> {
    await SDK.init()
    const accessToken = await SDK.getAccessToken()
    const extDataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService)
    const projectPageService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService)

    const dataManager = await extDataService.getExtensionDataManager(SDK.getExtensionContext().id, accessToken)

    const projectService = await projectPageService.getProject()
    const project = projectService?.name ?? ''
    const organization = SDK.getHost().name

    return { project: project, organization: organization, extensionDataManager: dataManager }
}
