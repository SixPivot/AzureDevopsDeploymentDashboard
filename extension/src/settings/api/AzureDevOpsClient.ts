import { getClient } from 'azure-devops-extension-api'
import { TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent'
import { sortByConvention } from '../../api/Utilities'
import { IEnvironmentInstance } from './types'

export async function getEnvironments(projectName: string): Promise<IEnvironmentInstance[]> {
    const taskAgentClient = getClient(TaskAgentRestClient)

    const environments = (await taskAgentClient.getEnvironments(projectName)).map((i) => {
        return {
            name: i.name,
        } as IEnvironmentInstance
    })
    return sortByConvention(environments) as IEnvironmentInstance[]
}
