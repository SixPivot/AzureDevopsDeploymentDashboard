import { Card } from 'azure-devops-ui/Card'
import { CustomHeader, HeaderDescription, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from 'azure-devops-ui/Header'
import { Page } from 'azure-devops-ui/Page'
import { Spinner, SpinnerSize } from 'azure-devops-ui/Spinner'
import { Table } from 'azure-devops-ui/Table'
import React from 'react'
import { Link } from 'azure-devops-ui/Link'
import { Button } from 'azure-devops-ui/Button'
import { IDashboardEnvironmentColumn, IEnvironmentPipelines, IPipelineInfo } from '../api/types'
import { sortEnvironmentsByconvention } from '../api/Utilities'
import { DeploymentTableCell } from './deployment-table-cell'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'

export interface IMainContentState {
    pipelines?: ArrayItemProvider<IPipelineInfo>
    columns: IDashboardEnvironmentColumn[]
    isLoading: boolean
    organisation?: string
    project?: string
}

export type MainContentProps = {
    environments: IEnvironmentPipelines[]
    pipelines: ArrayItemProvider<IPipelineInfo>
    organisation: string
    project: string
    isLoading: boolean
}

export const MainContent = (props: MainContentProps) => {
    console.log(props)
    const { environments, pipelines, project, organisation, isLoading } = props
    const columns = generateEnvironmentsAsColumns(environments)
    const state = {
        columns,
        pipelines,
        project,
        organisation,
        isLoading,
    }
    return (
        <Page className="flex-grow">
            <CustomHeader className="bolt-header-with-commandbar">
                <HeaderTitleArea>
                    <HeaderTitleRow>
                        <HeaderTitle ariaLevel={3} className="text-ellipsis" titleSize={TitleSize.Large}>
                            Deployment Dashboard
                        </HeaderTitle>
                    </HeaderTitleRow>
                    <HeaderDescription>
                        Provides a view of your products, deployments, and environments in your project's build pipelines.
                    </HeaderDescription>
                </HeaderTitleArea>
            </CustomHeader>

            <div className="page-content page-content-top">
                <Card>
                    {state.isLoading ? (
                        <div className="flex-grow padding-vertical-20 font-size-m">
                            <Spinner label="Loading data..." size={SpinnerSize.large} />
                        </div>
                    ) : state.pipelines && state.pipelines.length > 0 ? (
                        <Table className="deployments-table" columns={state.columns} itemProvider={state.pipelines} />
                    ) : (
                        <div className="font-size-m flex-grow text-center padding-vertical-20">
                            <div className="margin-bottom-16 font-weight-heavy font-size-l">No deployments were found in any pipelines</div>
                            <Link
                                className="no-underline-link"
                                target="_top"
                                href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/deployment-jobs?view=azure-devops"
                            >
                                Learn more
                            </Link>{' '}
                            about deployment jobs and how to set them up in your pipelines.
                            <div className="margin-top-16">
                                <Button
                                    text="View pipelines"
                                    primary={true}
                                    target="_top"
                                    href={`https://dev.azure.com/${state.organisation}/${state.project}/_build`}
                                />
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </Page>
    )
}

function generateEnvironmentsAsColumns(environments: IEnvironmentPipelines[]): Array<IDashboardEnvironmentColumn> {
    const columns: IDashboardEnvironmentColumn[] = []

    const renderCell = (_: number, columnIndex: number, tableColumn: IDashboardEnvironmentColumn, tableItem: IPipelineInfo) => {
        return <DeploymentTableCell columnIndex={columnIndex} tableColumn={tableColumn} tableItem={tableItem} />
    }

    columns.push({
        id: 'name',
        name: '',
        renderCell,
        width: 250,
        sortOrder: 0,
    } as IDashboardEnvironmentColumn)

    const dynamicColumns = environments.map((environment) => {
        return {
            id: environment.name,
            name: environment.name,
            renderCell,
            width: 200,
        } as IDashboardEnvironmentColumn
    })

    const concatenated = columns.concat(dynamicColumns)

    const sorted = sortEnvironmentsByconvention(concatenated)

    return sorted
}
