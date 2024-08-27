import { SimpleTableCell, Table } from 'azure-devops-ui/Table'
import { Link } from 'azure-devops-ui/Link'
import React from 'react'
import { Status, StatusSize } from 'azure-devops-ui/Status'
import { generatePipelineInstancesArray, getStatusIndicatorData } from '../utilities'
import { IDashboardEnvironmentColumn, IEnvironmentInstance, IEnvironmentPipelines, IPipelineInstance } from '../types'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { Ago } from 'azure-devops-ui/Ago'
import { AgoFormat } from 'azure-devops-ui/Utilities/Date'

export type ListViewDeploymentsTableProps = {
    environmentPipelines: IEnvironmentPipelines[]
}
export const ListViewDeploymentsTable = (props: ListViewDeploymentsTableProps): JSX.Element => {
    const { environmentPipelines } = props
    const pipelines = generatePipelineInstancesArray(environmentPipelines)

    function getListViewColumns(environments: IEnvironmentInstance[]): Array<IDashboardEnvironmentColumn> {
        const columns: IDashboardEnvironmentColumn[] = []

        columns.push({
            id: 'name',
            name: '',
            renderCell,
            width: 250,
            conventionSortOrder: 0,
        } as IDashboardEnvironmentColumn)

        const dynamicColumns = environments.map((environment) => {
            return {
                id: environment.name,
                name: environment.name,
                renderCell,
                width: 200,
            } as IDashboardEnvironmentColumn
        })

        return columns.concat(dynamicColumns)
    }

    const renderCell = (_index: number, columnIndex: number, tableColumn: IDashboardEnvironmentColumn, tableItem: IPipelineInstance) => {
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
                            {...getStatusIndicatorData(tableItem.environments[tableColumn.id].result).statusProps}
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
                                {tableItem.environments[tableColumn.id].finishTime && (
                                    <Ago date={tableItem.environments[tableColumn.id].finishTime} format={AgoFormat.Extended} />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="no-data">-</div>
                )}
            </SimpleTableCell>
        )
    }

    return (
        <Table
            className="deployments-table"
            columns={getListViewColumns(environmentPipelines)}
            itemProvider={new ArrayItemProvider(pipelines)}
        />
    )
}
