import { Card } from 'azure-devops-ui/Card'
import { CustomHeader, HeaderDescription, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from 'azure-devops-ui/Header'
import { Page } from 'azure-devops-ui/Page'
import { Spinner, SpinnerSize } from 'azure-devops-ui/Spinner'
import { Table } from 'azure-devops-ui/Table'
import React from 'react'
import { IDashboardContentState } from './IDashboardContentState'
import { Link } from 'azure-devops-ui/Link'
import { Button } from 'azure-devops-ui/Button'

export const MainContent = (props: { state: IDashboardContentState }) => {
    const { state } = props
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
