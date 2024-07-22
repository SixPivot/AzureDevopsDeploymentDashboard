/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IProjectPageService } from 'azure-devops-extension-api'
import { CustomHeader, HeaderDescription, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from 'azure-devops-ui/Header'
import { Page } from 'azure-devops-ui/Page'
import { Card } from 'azure-devops-ui/Card'
import { SimpleTableCell, Table } from 'azure-devops-ui/Table'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IEnvironmentPipelines, IDashboardEnvironmentColumn, IStatusIndicatorData, IPipelineInfo } from './api/types'
import { getDashboardEnvironmentPipelineInfo } from './api/AzureDevopsClient'
import './dashboard.scss'
import { Status, Statuses, StatusSize } from 'azure-devops-ui/Status'
import { Link } from 'azure-devops-ui/Link'
import { Ago } from 'azure-devops-ui/Ago'
import { AgoFormat } from 'azure-devops-ui/Utilities/Date'
import { Spinner, SpinnerSize } from 'azure-devops-ui/Spinner'
import { Button } from 'azure-devops-ui/Button'
import { sortEnvironmentsByconvention } from './api/Utilities'
import { InitTelemetry } from './telemetry/applicationInsights'

interface IDashboardContentState {
    pipelines?: ArrayItemProvider<any>
    columns: IDashboardEnvironmentColumn[]
    isLoading: boolean
    organisation?: string
    project?: string
}

export class Dashboard extends React.Component<{}, IDashboardContentState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            columns: [
                {
                    id: 'name',
                    name: '',
                    renderCell: this.renderCell,
                    width: 300,
                } as IDashboardEnvironmentColumn,
            ],
            pipelines: new ArrayItemProvider<IPipelineInfo>([]),
            isLoading: true,
        }
    }

    renderCell = (_: number, columnIndex: number, tableColumn: IDashboardEnvironmentColumn, tableItem: IPipelineInfo): JSX.Element => {
        return (
            <SimpleTableCell
                columnIndex={columnIndex}
                tableColumn={tableColumn}
                key={'col-' + columnIndex}
                contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m bolt-table-cell-content-with-inline-link"
            >
                {tableColumn.id === 'name' ? (
                    <Link className="bolt-table-inline-link bolt-table-link no-underline-link" target="_top" href={tableItem.uri}>
                        {tableItem.name}
                    </Link>
                ) : tableItem.environments[tableColumn.id] ? (
                    <div className="flex-row flex-start">
                        <Status
                            {...this.getStatusIndicatorData(tableItem.environments[tableColumn.id].result).statusProps}
                            className="icon-large-margin status-icon"
                            size={StatusSize.m}
                        />
                        <div className="flex-column wrap-text">
                            <Link
                                className="bolt-table-inline-link bolt-table-link no-underline-link"
                                target="_top"
                                href={tableItem.environments[tableColumn.id].uri}
                            >
                                {tableItem.environments[tableColumn.id].value}
                            </Link>
                            <div className="finish-date">
                                <Ago date={tableItem.environments[tableColumn.id].finishTime} format={AgoFormat.Extended} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="no-data">-</div>
                )}
            </SimpleTableCell>
        )
    }

    getStatusIndicatorData = (status: number): IStatusIndicatorData => {
        const indicatorData: IStatusIndicatorData = {
            label: 'Success',
            statusProps: { ...Statuses.Success, ariaLabel: 'Success' },
        }

        switch (status) {
            case 2:
                indicatorData.statusProps = {
                    ...Statuses.Failed,
                    ariaLabel: 'Failed',
                }
                indicatorData.label = 'Failed'
                break
            case 3:
                indicatorData.statusProps = {
                    ...Statuses.Canceled,
                    ariaLabel: 'Canceled',
                }
                indicatorData.label = 'Canceled'
                break
            case 4:
                indicatorData.statusProps = {
                    ...Statuses.Skipped,
                    ariaLabel: 'Skipped',
                }
                indicatorData.label = 'Skipped'
                break
            case 5:
                indicatorData.statusProps = {
                    ...Statuses.Skipped,
                    ariaLabel: 'Abandoned',
                }
                indicatorData.label = 'Abandoned'
                break
        }

        return indicatorData
    }

    generateEnvironmentsAsColumns(environments: IEnvironmentPipelines[]): Array<IDashboardEnvironmentColumn> {
        const columns: IDashboardEnvironmentColumn[] = []

        columns.push({
            id: 'name',
            name: '',
            renderCell: this.renderCell,
            width: 250,
            sortOrder: 0,
        } as IDashboardEnvironmentColumn)

        const dynamicColumns = environments.map((environment) => {
            return {
                id: environment.name,
                name: environment.name,
                renderCell: this.renderCell,
                width: 200,
            } as IDashboardEnvironmentColumn
        })

        const concatenated = columns.concat(dynamicColumns)

        const sorted = sortEnvironmentsByconvention(concatenated)

        return sorted
    }

    public async componentDidMount() {
        await SDK.init()

        //Note: Couldn't use SDK.getWebContext().project.name. Because for some reason SDK.getWebContext() returns an empty object. Maybe it's not mean to work with local dev
        const projectPageService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService)
        const project = await projectPageService.getProject()
        const projectName = project?.name ?? ''

        const { environments, pipelines } = await getDashboardEnvironmentPipelineInfo(projectName)

        this.setState({
            columns: this.generateEnvironmentsAsColumns(environments),
            pipelines: pipelines,
            isLoading: false,
            organisation: SDK.getHost().name,
            project: projectName,
        })
    }

    public render(): JSX.Element {
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
                        {this.state.isLoading ? (
                            <div className="flex-grow padding-vertical-20 font-size-m">
                                <Spinner label="Loading data..." size={SpinnerSize.large} />
                            </div>
                        ) : this.state.pipelines && this.state.pipelines.length > 0 ? (
                            <Table className="deployments-table" columns={this.state.columns} itemProvider={this.state.pipelines} />
                        ) : (
                            <div className="font-size-m flex-grow text-center padding-vertical-20">
                                <div className="margin-bottom-16 font-weight-heavy font-size-l">
                                    No deployments were found in any pipelines
                                </div>
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
                                        href={`https://dev.azure.com/${this.state.organisation}/${this.state.project}/_build`}
                                    />
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </Page>
        )
    }
}

InitTelemetry()

ReactDOM.render(<Dashboard />, document.getElementById('root'))
