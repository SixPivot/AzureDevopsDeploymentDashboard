/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IProjectPageService } from 'azure-devops-extension-api'
import { SimpleTableCell } from 'azure-devops-ui/Table'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IEnvironmentPipelines, IDashboardEnvironmentColumn, IStatusIndicatorData, IPipelineInfo } from '../api/types'
import { getDashboardEnvironmentPipelineInfo } from '../api/AzureDevopsClient'
import './main.scss'
import { Status, Statuses, StatusSize } from 'azure-devops-ui/Status'
import { Link } from 'azure-devops-ui/Link'
import { Ago } from 'azure-devops-ui/Ago'
import { AgoFormat } from 'azure-devops-ui/Utilities/Date'
import { sortEnvironmentsByconvention } from '../api/Utilities'
import { MainContent } from './main-content'
import { IDashboardContentState } from './IDashboardContentState'

export class Main extends React.Component<{}, IDashboardContentState> {
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
        return <MainContent state={this.state}></MainContent>
    }
}
