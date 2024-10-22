import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { InitTelemetry } from '../telemetry/applicationInsights'
import { initAzureDevOpsSdk } from '../api/AzureDevOpsSdkManager'
import { getDashboardEnvironmentPipeline } from '../api/AzureDevopsClient'
import { ExtensionDataKeys, IDashboardContentState, IEnvironmentInstance } from '../types'
import { DashboardContent } from './DashboardContent'
import { merge } from '../utilities'
import './Dashboard.scss'
const Dashboard = () => {
    const [state, setState] = React.useState<IDashboardContentState>({
        environments: [],
        pipelines: [],
        isLoading: true,
    })
    React.useEffect(() => {
        load()
            .then((data) => setState(data))
            .catch((err) => {
                throw err
            })
    }, [])
    return <DashboardContent state={state}></DashboardContent>
}

// todo: add user settings for this.
// This will become an opt-in for users who want to help us out.
const enableTelemetry = false
InitTelemetry(enableTelemetry)

ReactDOM.render(<Dashboard />, document.getElementById('root'))

async function load(): Promise<IDashboardContentState> {
    const projectInfo = await initAzureDevOpsSdk()

    const { environments, pipelines } = await getDashboardEnvironmentPipeline(projectInfo.name)

    const sortedEnvironments =
        (await projectInfo.extensionDataManager.getValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments)) ?? []

    return {
        environments: merge(environments, sortedEnvironments) ?? environments,
        pipelines: pipelines,
        projectInfo: projectInfo,
        isLoading: false,
    }
}
