/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IProjectPageService } from 'azure-devops-extension-api'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IPipelineInfo } from '../api/types'
import { getDashboardEnvironmentPipelineInfo } from '../api/AzureDevopsClient'
import './main.scss'
import { MainContent, MainContentProps } from './main-content'

export class Main extends React.Component<{}, MainContentProps> {
    constructor(props: {}) {
        super(props)

        this.state = {
            environments: [],
            pipelines: new ArrayItemProvider<IPipelineInfo>([]),
            isLoading: true,
            project: "",
            organisation: ""
        }
    }


    public async componentDidMount() {
        await SDK.init()

        //Note: Couldn't use SDK.getWebContext().project.name. Because for some reason SDK.getWebContext() returns an empty object. Maybe it's not mean to work with local dev
        const projectPageService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService)
        const project = await projectPageService.getProject()
        const projectName = project?.name ?? ''

        const { environments, pipelines } = await getDashboardEnvironmentPipelineInfo(projectName)
        
        this.setState({
            environments: environments,
            pipelines: pipelines,
            organisation: SDK.getHost().name,
            project: projectName,
            isLoading: false
        })
    }
    public render(): JSX.Element {
        return <MainContent {...this.state}></MainContent>
    }
}
