/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import { MainContent } from './MainContent'
import { ExtensionDataKeys, IEnvironmentInstance, IDashboardMainState } from '../types'

import './main.scss'
import { initAzureDevOpsSdk } from '../api/AzureDevOpsSdkManager'
import { getDashboardEnvironmentPipeline } from '../api/AzureDevopsClient'
import { merge } from '../utilities'

export class Main extends React.Component<{}, IDashboardMainState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            environments: [],
            pipelines: [],
            isLoading: true,
            project: '',
            organisation: '',
        }
    }

    public async componentDidMount() {
        const { project, organization, extensionDataManager } = await initAzureDevOpsSdk()

        const { environments, pipelines } = await getDashboardEnvironmentPipeline(project)

        const sortedEnvironments = (await extensionDataManager.getValue<IEnvironmentInstance[]>(ExtensionDataKeys.Environments)) ?? []

        this.setState({
            environments: merge(environments, sortedEnvironments) ?? environments,
            pipelines: pipelines,
            organisation: organization,
            project: project,
            isLoading: false,
        })
    }

    public render(): JSX.Element {
        return <MainContent {...this.state}></MainContent>
    }
}
