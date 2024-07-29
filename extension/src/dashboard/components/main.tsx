/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { MainContent, MainContentProps } from './main-content'
import { IPipelineInstance } from '../api/types'
import { getDashboardEnvironmentPipeline } from '../api/AzureDevopsClient'
import { ExtensionDataKeys, IEnvironmentInstance } from '../../api/types'
import { merge } from '../../api/Utilities'
import { initAzureDevOpsSdk } from '../../api/AzureDevOpsSdkManager'

import './main.scss'

export class Main extends React.Component<{}, MainContentProps> {
    constructor(props: {}) {
        super(props)

        this.state = {
            environments: [],
            pipelines: new ArrayItemProvider<IPipelineInstance>([]),
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
