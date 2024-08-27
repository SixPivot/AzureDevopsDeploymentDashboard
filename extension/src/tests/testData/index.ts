import _environments from './environments.json'
import _pipelines from './pipelines.json'
import deployment_366 from './deployment_366.json'
import deployment_377 from './deployment_377.json'
import deployment_378 from './deployment_378.json'
import deployment_412 from './deployment_412.json'
import deployment_415 from './deployment_415.json'
import { EnvironmentDeploymentExecutionRecord, EnvironmentInstance } from 'azure-devops-extension-api/TaskAgent'
import { Pipeline } from 'azure-devops-extension-api/Pipelines/Pipelines'
import { IExtensionDataManager } from 'azure-devops-extension-api'
import { IDevOpsProjectInfo } from '../../types'
import { getDashboardEnvironmentPipeline } from '../../api/AzureDevopsClient'

const environments = parseDates(_environments) as unknown as EnvironmentInstance[]
const pipelines = parseDates(_pipelines) as unknown as Pipeline[]
const deployments = parseDates([
    ...deployment_366,
    ...deployment_377,
    ...deployment_378,
    ...deployment_412,
    ...deployment_415,
]) as unknown as EnvironmentDeploymentExecutionRecord[]

function parseDates(obj: any) {
    for (let key in obj) {
        if (typeof obj[key] === 'string' && !isNaN(Date.parse(obj[key]))) {
            obj[key] = new Date(obj[key])
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            parseDates(obj[key])
        }
    }
}

jest.mock('azure-devops-extension-api', () => {
    return {
        getClient: () => {
            return {
                getEnvironments: () => {
                    return Promise.resolve(environments)
                },
                listPipelines: () => {
                    return Promise.resolve(pipelines)
                },
                getEnvironmentDeploymentExecutionRecords: (_: string, environmentId: number) => {
                    const filtered = deployments.filter((x) => x.environmentId === environmentId)
                    return Promise.resolve(filtered)
                },
            }
        },
    }
})

jest.mock('azure-devops-extension-api/Identities', () => {})

jest.mock('azure-devops-extension-api/TaskAgent', () => {
    return {
        TaskAgentRestClient: {},
    }
})
jest.mock('azure-devops-extension-api/Pipelines/PipelinesClient', () => {
    return {}
})

export const init = async () => {
    const projectInfo = {
        name: 'name',
        organization: 'organization',
        extensionId: 'extensionId',
        extensionDataManager: {
            getValue: () => {
                return []
            },
        } as unknown as IExtensionDataManager,
        projectUri: 'projectUri',
        pipelinesUri: `${'projectUri'}/_build/`,
        settingsUri: `${'projectUri'}/_settings/${'extensionId'}.${'ContributionIds.DeploymentDashboardSettings'}`,
        deploymentDashboardUri: `${'projectUri'}/_apps/hub/${'extensionId'}.${'ContributionIds.DeploymentDashboard'}`,
    } as IDevOpsProjectInfo

    const environmentPipelines = await getDashboardEnvironmentPipeline(projectInfo)
    return { environmentPipelines, projectInfo }
}
