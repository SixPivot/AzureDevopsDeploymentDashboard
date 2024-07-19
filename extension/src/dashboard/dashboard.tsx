/// <reference types="vss-web-extension-sdk" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
import {
  CustomHeader,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleArea,
  HeaderTitleRow,
  TitleSize,
} from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
import { ITableColumn, SimpleTableCell, Table } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import {
  DashboardEnvironmentPipelineInfo,
  EnvironmentPipelines,
  IPipelineContentState,
  IStatusIndicatorData,
  PipelineInfo,
} from "./api/types";
import { getPipelines } from "./api/AzureDevopsClient";
import "./dashboard.scss";
import { Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { Link } from "azure-devops-ui/Link";
import { Button } from "azure-devops-ui/Button";

export class Dashboard extends React.Component<{}, IPipelineContentState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      columns: [
        {
          id: "name",
          name: "",
          renderCell: this.renderReleaseInfo,
          width: 300,
        },
      ],
      pipelines: new ArrayItemProvider<PipelineInfo>([]),
    };
  }

  renderReleaseInfo = (
    rowIndex: number,
    columnIndex: number,
    tableColumn: ITableColumn<any>,
    tableItem: PipelineInfo
  ): JSX.Element => {
    return (
      <SimpleTableCell
        columnIndex={columnIndex}
        tableColumn={tableColumn}
        key={"col-" + columnIndex}
        contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m bolt-table-cell-content-with-inline-link"
      >
        {tableColumn.id === "name" ? (
          <Link className="bolt-table-inline-link bolt-table-link no-underline-link" target="_top" href={tableItem.uri}>{tableItem.name}</Link>
        ) : tableItem.environments[tableColumn.id] ? (
          <div className="flex-row flex-start">
            <Status
              {...this.getStatusIndicatorData(
                tableItem.environments[tableColumn.id].result
              ).statusProps}
              className="icon-large-margin status-icon"
              size={StatusSize.m}
            />
            <div className="flex-column wrap-text">
            <Link className="bolt-table-inline-link bolt-table-link no-underline-link" target="_top" href={tableItem.environments[tableColumn.id].uri}>{tableItem.environments[tableColumn.id].value}</Link>
              <div className="finish-date">
                {tableItem.environments[tableColumn.id].finishTime}
              </div>
            </div>
          </div>
        ) : (
          <div className="no-data">-</div>
        )}
      </SimpleTableCell>
    );
  };

  getStatusIndicatorData = (status: number): IStatusIndicatorData => {
    const indicatorData: IStatusIndicatorData = {
      label: "Success",
      statusProps: { ...Statuses.Success, ariaLabel: "Success" },
    };

    switch (status) {
      case 2:
        indicatorData.statusProps = { ...Statuses.Failed, ariaLabel: "Failed" };
        indicatorData.label = "Failed";
        break;
      case 3:
        indicatorData.statusProps = {
          ...Statuses.Canceled,
          ariaLabel: "Canceled",
        };
        indicatorData.label = "Canceled";
        break;
      case 4:
        indicatorData.statusProps = {
          ...Statuses.Skipped,
          ariaLabel: "Skipped",
        };
        indicatorData.label = "Skipped";
        break;
      case 5:
        indicatorData.statusProps = {
          ...Statuses.Skipped,
          ariaLabel: "Abandoned",
        };
        indicatorData.label = "Abandoned";
        break;
    }

    return indicatorData;
  };

  private generateColumns(environments: EnvironmentPipelines[]): Array<any> {
    let columns = [];
    columns.push({
      id: "name",
      name: "",
      renderCell: this.renderReleaseInfo,
      width: 250,
    });
    const dynamicColumns = environments.map((environment) => {
      return {
        id: environment.name,
        name: environment.name,
        renderCell: this.renderReleaseInfo,
        width: 200,
      };
    });
    columns = columns.concat(dynamicColumns);
    return columns;
  }

  public componentDidMount() {
    SDK.init();

    getPipelines().then((arg: DashboardEnvironmentPipelineInfo) => {
      const { environments, pipelines } = arg;
      this.setState({
        columns: this.generateColumns(environments),
        pipelines: pipelines,
      });
    });
  }

  public render(): JSX.Element {
    return (
      <Page className="flex-grow">
        <CustomHeader className="bolt-header-with-commandbar">
          <HeaderTitleArea>
            <HeaderTitleRow>
              <HeaderTitle
                ariaLevel={3}
                className="text-ellipsis"
                titleSize={TitleSize.Large}
              >
                SixPivot Release Dashboard
              </HeaderTitle>
            </HeaderTitleRow>
            <HeaderDescription>
              Provides a view of your products, releases and environments over
              your organisation's build pipelines.
            </HeaderDescription>
          </HeaderTitleArea>
        </CustomHeader>

        <div className="page-content page-content-top">
          <Card>
            <div>
              {!this.state.pipelines && <p>Loading...</p>}
              {this.state.pipelines && (
                <Table
                  columns={this.state.columns}
                  itemProvider={this.state.pipelines}
                />
              )}
            </div>
          </Card>
        </div>
      </Page>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));
