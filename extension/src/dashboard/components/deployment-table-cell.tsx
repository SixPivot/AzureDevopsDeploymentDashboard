import { SimpleTableCell } from 'azure-devops-ui/Table'
import { IDashboardEnvironmentColumn, IPipelineInfo, IStatusIndicatorData } from '../api/types'
import { Link } from 'azure-devops-ui/Link'
import React from 'react'
import { Status, Statuses, StatusSize } from 'azure-devops-ui/Status'
import { AgoFormat } from 'azure-devops-ui/Utilities/Date'
import { Ago } from 'azure-devops-ui/Ago'

export const DeploymentTableCell = (props: { tableItem: IPipelineInfo; columnIndex: number; tableColumn: IDashboardEnvironmentColumn }) => {
    const { tableItem, tableColumn, columnIndex } = props
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

const getStatusIndicatorData = (status: number): IStatusIndicatorData => {
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
