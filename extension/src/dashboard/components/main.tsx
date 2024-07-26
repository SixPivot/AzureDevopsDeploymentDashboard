/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import { SimpleTableCell } from 'azure-devops-ui/Table'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { Status, Statuses, StatusSize } from 'azure-devops-ui/Status'
import { Link } from 'azure-devops-ui/Link'
import { Ago } from 'azure-devops-ui/Ago'
import { AgoFormat } from 'azure-devops-ui/Utilities/Date'
import { MainContent } from './main-content'
import { IDashboardContentState } from './IDashboardContentState'
import { IDashboardEnvironmentColumn, IStatusIndicatorData, IPipelineInstance } from '../api/types'
import { getDashboardEnvironmentPipelineInfo } from '../api/AzureDevopsClient'
import { IEnvironmentInstance } from '../../api/types'
import { sortByConvention } from '../../api/Utilities'
import { AzureDevOpsSdkManager } from '../../api/AzureDevOpsSdkManager'

import './main.scss'

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
            pipelines: new ArrayItemProvider<IPipelineInstance>([]),
            isLoading: true,
        }
        this._sdkManager = new AzureDevOpsSdkManager()
    }

    private readonly _sdkManager: AzureDevOpsSdkManager

    renderCell = (_: number, columnIndex: number, tableColumn: IDashboardEnvironmentColumn, tableItem: IPipelineInstance): JSX.Element => {
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

    generateEnvironmentsAsColumns(environments: IEnvironmentInstance[], sort: boolean = true): Array<IDashboardEnvironmentColumn> {
        const columns: IDashboardEnvironmentColumn[] = []

        columns.push({
            id: 'name',
            name: '',
            renderCell: this.renderCell,
            width: 250,
            conventionSortOrder: 0,
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

        if (sort) {
            const sorted = sortByConvention(concatenated)

            return sorted as IDashboardEnvironmentColumn[]
        }
        return concatenated
    }

    public async componentDidMount() {
        await this._sdkManager.init()

        const projectName = this._sdkManager.getProjectName()

        const { environments, pipelines } = await getDashboardEnvironmentPipelineInfo(projectName)

        const manuallySortedEnvironments = await this._sdkManager.getCustomEnvironmentSortOrder()

        this.setState({
            columns: this.generateEnvironmentsAsColumns(
                manuallySortedEnvironments ?? environments,
                manuallySortedEnvironments === undefined
            ),
            pipelines: pipelines,
            isLoading: false,
            organisation: this._sdkManager.getOrgnaizationName(),
            project: projectName,
        })
    }

    public render(): JSX.Element {
        return <MainContent state={this.state}></MainContent>
    }
}
