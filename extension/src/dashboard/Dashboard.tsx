import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { InitTelemetry } from '../telemetry/applicationInsights'
import { initAzureDevOpsSdk } from '../api/AzureDevOpsSdkManager'
import { getDashboardEnvironmentPipeline } from '../api/AzureDevopsClient'
import { ExtensionDataKeys, IDashboardMainState, IEnvironmentInstance } from '../types'
import { DashboardContent } from './DashboardContent'
import { merge } from '../utilities'
import './Dashboard.scss'

export class Dashboard extends React.Component<{}, IDashboardMainState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            environments: [],
            pipelines: [],
            isLoading: true,
        }
    }

    public async componentDidMount() {
        const projectInfo = await initAzureDevOpsSdk()

        const { environments, pipelines } = await getDashboardEnvironmentPipeline(projectInfo.name)

        const sortedEnvironments =
            (await projectInfo.extensionDataManager.getValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments)) ?? []

        this.setState({
            environments: merge(environments, sortedEnvironments) ?? environments,
            pipelines: pipelines,
            projectInfo: projectInfo,
            isLoading: false,
        })
    }

    public render(): JSX.Element {
        return <DashboardContent {...this.state}></DashboardContent>
    }
}

// todo: add user settings for this.
// This will become an opt-in for users who want to help us out.
const enableTelemetry = false
InitTelemetry(enableTelemetry)

ReactDOM.render(<Dashboard />, document.getElementById('root'))
