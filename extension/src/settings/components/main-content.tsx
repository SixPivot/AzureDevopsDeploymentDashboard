import React from 'react'
import { Card } from 'azure-devops-ui/Card'
import { CustomHeader, HeaderDescription, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from 'azure-devops-ui/Header'
import { Spinner, SpinnerSize } from 'azure-devops-ui/Spinner'
import { Table } from 'azure-devops-ui/Table'
import { Link } from 'azure-devops-ui/Link'
import { Button } from 'azure-devops-ui/Button'
import { ISettingsContentState } from './ISettingsContentState'
import { Page } from 'azure-devops-ui/Page'

export const MainContent = (props: { state: ISettingsContentState }) => {
    const { state } = props
    return (
        <Page className="flex-grow setting-page">
            <CustomHeader className="bolt-header-with-commandbar">
                <HeaderTitleArea>
                    <HeaderTitleRow>
                        <HeaderTitle ariaLevel={3} className="text-ellipsis" titleSize={TitleSize.Large}>
                            Deployment Dashboard Settings
                        </HeaderTitle>
                    </HeaderTitleRow>
                    <HeaderDescription>Customise deployment dashboard</HeaderDescription>
                </HeaderTitleArea>
            </CustomHeader>

            <div className="page-content page-content-top">
                <Card
                    className="bolt-card-white bolt-table-card"
                    titleProps={{ text: 'Sort environments' }}
                    headerDescriptionProps={{ text: 'Sort environments in the order you wish them to appear in the dashboard' }}
                >
                    {state.isLoading ? (
                        <div className="flex-grow padding-vertical-20 font-size-m">
                            <Spinner label="Loading data..." size={SpinnerSize.large} />
                        </div>
                    ) : state.environments && state.environments.length > 0 ? (
                        <Table className="environments-table" columns={state.columns} itemProvider={state.environments} />
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
