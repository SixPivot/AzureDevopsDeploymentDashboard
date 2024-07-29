import { Card } from 'azure-devops-ui/Card'
import { CustomHeader, HeaderDescription, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from 'azure-devops-ui/Header'
import { Page } from 'azure-devops-ui/Page'
import { Spinner, SpinnerSize } from 'azure-devops-ui/Spinner'
import { Table } from 'azure-devops-ui/Table'
import React, { useEffect, useState } from 'react'
import { Link } from 'azure-devops-ui/Link'
import { Button } from 'azure-devops-ui/Button'
import { IDashboardEnvironmentColumn, IPipelineInstance } from '../api/types'
import { DeploymentTableCell } from './deployment-table-cell'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IEnvironmentInstance } from '../../api/types'
import { TreeViewTable } from './tree-view-table'
import { DropdownSelection } from 'azure-devops-ui/Utilities/DropdownSelection'
import { Dropdown } from 'azure-devops-ui/Dropdown'

export interface IMainContentState {
    pipelines?: ArrayItemProvider<IPipelineInstance>
    columns: IDashboardEnvironmentColumn[]
    isLoading: boolean
    organisation?: string
    project?: string
}

export type MainContentProps = {
    environments: IEnvironmentInstance[]
    pipelines: ArrayItemProvider<IPipelineInstance>
    organisation: string
    project: string
    isLoading: boolean
}

export const MainContent = (props: MainContentProps) => {
    const { environments, pipelines, project, organisation, isLoading } = props
    const columns = generateEnvironmentsAsColumns(environments)
    const state: IMainContentState = {
        columns,
        pipelines,
        project,
        organisation,
        isLoading,
    }
    const viewSelection = new DropdownSelection()
    const [viewType, setViewType] = useState('list')

    useEffect(() => {
        viewSelection.select(0)
    }, [])

    return (
        <Page className="flex-grow">
            <CustomHeader className="bolt-header-with-commandbar">
                <HeaderTitleArea>
                    <HeaderTitleRow>
                        <HeaderTitle ariaLevel={3} className="text-ellipsis" titleSize={TitleSize.Large}>
                            Deployment Dashboard
                        </HeaderTitle>
                    </HeaderTitleRow>
                    <HeaderDescription className="flex-row flex-center justify-space-between">
                        <div>Provides a view of your products, deployments, and environments in your project's build pipelines.</div>
                        <div>
                            <Dropdown
                                ariaLabel="Basic"
                                className="example-dropdown"
                                placeholder="Select an Option"
                                items={[
                                    { id: 'list', text: 'List View' },
                                    { id: 'folder', text: 'Folder View' },
                                ]}
                                onSelect={(_, item) => {
                                    setViewType(item.id)
                                }}
                                selection={viewSelection}
                            />
                        </div>
                    </HeaderDescription>
                </HeaderTitleArea>
            </CustomHeader>

            <div className="page-content page-content-top">
                <Card>
                    {state.isLoading ? (
                        <div className="flex-grow padding-vertical-20 font-size-m">
                            <Spinner label="Loading data..." size={SpinnerSize.large} />
                        </div>
                    ) : state.pipelines && state.pipelines.length === 0 ? (
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
                    ) : viewType === 'list' ? (
                        <Table className="deployments-table" columns={state.columns} itemProvider={state.pipelines} />
                    ) : (
                        <TreeViewTable environments={environments} pipelines={state.pipelines!} />
                    )}
                </Card>
            </div>
        </Page>
    )
}

function generateEnvironmentsAsColumns(environments: IEnvironmentInstance[]): Array<IDashboardEnvironmentColumn> {
    const columns: IDashboardEnvironmentColumn[] = []

    const renderCell = (index: number, columnIndex: number, tableColumn: IDashboardEnvironmentColumn, tableItem: IPipelineInstance) => {
        return (
            <DeploymentTableCell
                key={`deployment-cell-${index}-${columnIndex}`}
                columnIndex={columnIndex}
                tableColumn={tableColumn}
                tableItem={tableItem}
            />
        )
    }

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
