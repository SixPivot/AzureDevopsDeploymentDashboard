/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import * as SDK from 'azure-devops-extension-sdk'
import { CommonServiceIds, IProjectPageService } from 'azure-devops-extension-api'
import { ITableColumn, SimpleTableCell, TableColumnLayout } from 'azure-devops-ui/Table'
import { ObservableValue } from 'azure-devops-ui/Core/Observable'
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { Button } from 'azure-devops-ui/Button'
import { ButtonGroup } from 'azure-devops-ui/ButtonGroup'
import { getEnvironments } from '../api/AzureDevOpsClient'
import { ISettingsContentState } from './ISettingsContentState'
import { IEnvironmentInstance } from '../api/types'
import { MainContent } from './main-content'
import './main.scss'
export class Main extends React.Component<{}, ISettingsContentState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            columns: [
                {
                    columnLayout: TableColumnLayout.singleLine,
                    id: 'environmentName',
                    name: 'Environment name',
                    readonly: true,
                    renderCell: this.renderEnvironmentNameCell,
                    width: new ObservableValue(-30),
                },
                {
                    columnLayout: TableColumnLayout.singleLine,
                    id: 'sortingButtons',
                    name: '',
                    readonly: true,
                    renderCell: this.renderSortingButtonsCell,
                    width: new ObservableValue(-30),
                },
            ],
            environments: new ArrayItemProvider<IEnvironmentInstance>([]),
            isLoading: true,
        }
    }

    public async componentDidMount() {
        await SDK.init()

        //Note: Couldn't use SDK.getWebContext().project.name. Because for some reason SDK.getWebContext() returns an empty object. Maybe it's not mean to work with local dev
        const projectPageService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService)
        const project = await projectPageService.getProject()
        const projectName = project?.name ?? ''

        const environments = await getEnvironments(projectName)

        this.setState({
            environments: new ArrayItemProvider(environments),
            isLoading: false,
            organisation: SDK.getHost().name,
            project: projectName,
        })
    }

    renderEnvironmentNameCell = (
        _rowIndex: number,
        columnIndex: number,
        tableColumn: ITableColumn<IEnvironmentInstance>,
        tableItem: IEnvironmentInstance
    ): JSX.Element => {
        return (
            <SimpleTableCell
                columnIndex={columnIndex}
                tableColumn={tableColumn}
                key={'col-' + columnIndex}
                contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m bolt-table-cell-content-with-inline-link"
            >
                <div className="flex-row flex-start">
                    <div className="flex-column wrap-text">{tableItem.name}</div>
                </div>
            </SimpleTableCell>
        )
    }

    renderSortingButtonsCell = (
        rowIndex: number,
        columnIndex: number,
        tableColumn: ITableColumn<IEnvironmentInstance>,
        _tableItem: IEnvironmentInstance
    ): JSX.Element => {
        const totalEnvironments = this.state.environments?.length ?? 0
        return (
            <SimpleTableCell
                columnIndex={columnIndex}
                tableColumn={tableColumn}
                key={'col-' + columnIndex}
                contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m bolt-table-cell-content-with-inline-link"
            >
                <ButtonGroup className="flex-wrap">
                    <Button
                        disabled={rowIndex === 0}
                        ariaLabel="Move up"
                        iconProps={{ iconName: 'Up' }}
                        onClick={() => this.moveUp(this.state.environments?.value, rowIndex)}
                    />
                    <Button
                        disabled={rowIndex === totalEnvironments - 1}
                        ariaLabel="Move down"
                        iconProps={{ iconName: 'Down' }}
                        onClick={() => this.moveDown(this.state.environments?.value, rowIndex)}
                    />
                </ButtonGroup>
            </SimpleTableCell>
        )
    }

    moveUp = (arr: IEnvironmentInstance[] | undefined, index: number) => {
        if (!arr || index === 0) {
            return
        }
        const temp = arr[index]
        arr[index] = arr[index - 1]
        arr[index - 1] = temp
        this.setState({
            environments: new ArrayItemProvider(arr),
        })
    }

    moveDown = (arr: IEnvironmentInstance[] | undefined, index: number) => {
        if (!arr || index === arr.length - 1) {
            return
        }

        const current = arr[index]
        arr[index] = arr[index + 1]
        arr[index + 1] = current
        this.setState({
            environments: new ArrayItemProvider(arr),
        })
    }

    public render(): JSX.Element {
        return <MainContent state={this.state} />
    }
}
