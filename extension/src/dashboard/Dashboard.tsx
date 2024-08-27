import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { InitTelemetry } from '../telemetry/applicationInsights'
import { initAzureDevOpsSdk } from '../api/AzureDevOpsSdkManager'
import { getDashboardEnvironmentPipeline } from '../api/AzureDevopsClient'
import { IDashboardMainState } from '../types'
import { DashboardContent } from './DashboardContent'
import './Dashboard.scss'

export class Dashboard extends React.Component<{}, IDashboardMainState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            environmentPipelines: [],
            isLoading: true,
        }
    }

    public async componentDidMount() {
        const projectInfo = await initAzureDevOpsSdk()

        const environmentPipelines = await getDashboardEnvironmentPipeline(projectInfo)

        this.setState({
            environmentPipelines,
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
