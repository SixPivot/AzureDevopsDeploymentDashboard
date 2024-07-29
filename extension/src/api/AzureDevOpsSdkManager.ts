/// <reference types="vss-web-extension-sdk" />
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IExtensionDataService, IExtensionDataManager, IProjectPageService } from 'azure-devops-extension-api'
import { IEnvironmentInstance, ExtensionDataKeys } from './types'

export class AzureDevOpsSdkManager {
    private _dataManager: IExtensionDataManager | undefined
    private _projectName: string | undefined
    private _organization: string | undefined
    /**
     * Initialized AzureDevOpsSdkManager and calls SDK.init() at the begning
     */
    public async init() {
        await SDK.init()
        const accessToken = await SDK.getAccessToken()
        const extDataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService)
        const projectPageService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService)

        this._dataManager = await extDataService.getExtensionDataManager(SDK.getExtensionContext().id, accessToken)

        const project = await projectPageService.getProject()
        this._projectName = project?.name ?? ''
        this._organization = SDK.getHost().name
    }

    public getProjectName(): string {
        return this._projectName ?? ''
    }

    public getOrgnaizationName(): string {
        return this._organization ?? ''
    }

    public async storeEnvironmentsInSettings(enviroments: IEnvironmentInstance[]) {
        await this.setValue(ExtensionDataKeys.Environments, enviroments)
    }

    public async getEnvironmentsFromSettings(): Promise<IEnvironmentInstance[] | undefined> {
        return await this.getValue(ExtensionDataKeys.Environments)
    }

    public async clearEnvironmentsInSettings() {
        await this._dataManager?.setValue(ExtensionDataKeys.Environments, undefined)
    }

    private async setValue<T>(key: string, value: T): Promise<void> {
        if (this._dataManager) await this._dataManager.setValue(key, value)
    }

    private async getValue<T>(key: string): Promise<T | undefined> {
        if (this._dataManager) return await this._dataManager.getValue<T>(key)

        return undefined
    }
}
