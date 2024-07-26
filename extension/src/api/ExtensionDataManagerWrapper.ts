/// <reference types="vss-web-extension-sdk" />
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IExtensionDataService, IExtensionDataManager, IProjectPageService } from 'azure-devops-extension-api'
import { IEnvironmentInstance, ExtensionDataKeys } from './types'
export class ExtensionDataManagerWrapper {
    private _dataManager: IExtensionDataManager | undefined
    private _projectName: string | undefined
    private _organization: string | undefined
    /**
     * Initialized ExtensionDataManagerWrapper. Must be called after SDK.init()
     */
    public async init() {
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

    public async setCustomEnvironmentSortOrder(enviroments: IEnvironmentInstance[]) {
        await this.setValue(ExtensionDataKeys.CustomeEnvironmentSortOrder, enviroments)
    }

    public async getCustomEnvironmentSortOrder(): Promise<IEnvironmentInstance[] | undefined> {
        return await this.getValue(ExtensionDataKeys.CustomeEnvironmentSortOrder)
    }

    public async clearCustomEnviromentsSortOrder() {
        await this._dataManager?.setValue(ExtensionDataKeys.CustomeEnvironmentSortOrder, undefined)
    }

    private async setValue<T>(key: string, value: T): Promise<void> {
        if (this._dataManager) await this._dataManager.setValue(key, value)
    }

    private async getValue<T>(key: string): Promise<T | undefined> {
        if (this._dataManager) return await this._dataManager.getValue<T>(key)

        return undefined
    }
}
