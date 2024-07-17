/// <reference types="vss-web-extension-sdk" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
import { CustomHeader, Header, HeaderDescription, HeaderIcon, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
import { getClient } from "azure-devops-extension-api";
import { TaskAgentRestClient } from "azure-devops-extension-api/TaskAgent";
import { ITableColumn, renderSimpleCell, SimpleTableCell, Table } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { IPipelineContentState } from "./api/types";
import { getPipelines } from "./api/AzureDevopsClient";
import "./dashboard.css";
import { IStatusProps, Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Tooltip } from "azure-devops-ui/TooltipEx";

enum PipelineStatus {
  running = "running",
  succeeded = "succeeded",
  failed = "failed",
  warning = "warning",
}

export interface IPipelineItem {
  name: string;
  status: PipelineStatus;
  lastRunData: IPipelineLastRun;
  favorite: ObservableValue<boolean>;
}

interface IPipelineLastRun {
  startTime?: Date;
  endTime?: Date;
  prId: number;
  prName: string;
  releaseType: ReleaseType;
  branchName: string;
}

enum ReleaseType {
  prAutomated,
  tag,
  scheduled,
  manual,
}

interface IStatusIndicatorData {
  statusProps: IStatusProps;
  label: string;
}

function getStatusIndicatorData(status: number): IStatusIndicatorData {

  // status = status || "";
  // status = status.toLowerCase();

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
        indicatorData.statusProps = { ...Statuses.Canceled, ariaLabel: "Canceled" };
        indicatorData.label = "Canceled";
        break;
  case 4:
    indicatorData.statusProps = { ...Statuses.Skipped, ariaLabel: "Skipped" };
    indicatorData.label = "Skipped";
    break;
  case 5:
    indicatorData.statusProps = { ...Statuses.Skipped, ariaLabel: "Abandoned" };
    indicatorData.label = "Abandoned";
    break;

      // case PipelineStatus.failed:
      //     indicatorData.statusProps = { ...Statuses.Failed, ariaLabel: "Failed" };
      //     indicatorData.label = "Failed";
      //     break;
      // case PipelineStatus.running:
      //     indicatorData.statusProps = { ...Statuses.Running, ariaLabel: "Running" };
      //     indicatorData.label = "Running";
      //     break;
      // case PipelineStatus.warning:
      //     indicatorData.statusProps = { ...Statuses.Warning, ariaLabel: "Warning" };
      //     indicatorData.label = "Warning";

          break;
  }

  return indicatorData;
}

  export function renderReleaseInfo(
    rowIndex: number,
    columnIndex: number,
    tableColumn: ITableColumn<any>,
    tableItem: any
  ): JSX.Element {
    if (rowIndex === 0) {
      console.log("KAI > ----------------------------------------");
      console.log("rowIndex", rowIndex);
      console.log("columnIndex", columnIndex);
      console.log("tableColumn", tableColumn);
      console.log("tableItem", tableItem);
    }

    return (
        <SimpleTableCell
            columnIndex={columnIndex}
            tableColumn={tableColumn}
            key={"col-" + columnIndex}
            contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m"
        >

          {tableColumn.id === 'name' ? (
            <div>{tableItem.name}</div>
          ) : (
            tableItem[tableColumn.id] ? (
              <div className="pipeline-details">
                <Status
                  {...getStatusIndicatorData(tableItem[tableColumn.id].result).statusProps}
                  className="icon-large-margin status-icon"
                  size={StatusSize.m}
              />
              <div className="flex-column wrap-text">
                  <div className="link">{tableItem[tableColumn.id].value}</div>
                  <div className="finish-date">{ tableItem[tableColumn.id].finishTime }</div>
              </div>
              </div>
            ) : (
              <div className="no-data">-</div>
            )
          )}
        </SimpleTableCell>
    );
  }

class Dashboard extends React.Component<{}, IPipelineContentState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      columns: [{
        id: "name",
        name: "",
        renderCell: renderSimpleCell,
        width: 300
      }],
      pipelines: new ArrayItemProvider([])
    };
  }

  public componentDidMount() {
    SDK.init();

    const client = getClient(TaskAgentRestClient);

    getPipelines(client).then((arg: any) => {
      console.log("KAI > getPipelines", arg);

      const { columns, pipelines } = arg;
      this.setState({
        columns: columns,
        pipelines: pipelines
      });
    });
  }


  public render(): JSX.Element {
    return (
      <Page className="flex-grow">
       <CustomHeader className="bolt-header-with-commandbar">
            <HeaderTitleArea>
                <HeaderTitleRow>
                    <HeaderTitle ariaLevel={3} className="text-ellipsis" titleSize={TitleSize.Large}>
                        SixPivot Release Dashboard
                    </HeaderTitle>
                </HeaderTitleRow>
                <HeaderDescription>
                    Provides a view of your products, releases and environments over your organisation's build pipelines.
                </HeaderDescription>
            </HeaderTitleArea>
        </CustomHeader>

      <div className="page-content page-content-top">
      <Card>
          <div>
            {
              !this.state.pipelines &&
              <p>Loading...</p>
            }
            {
              this.state.pipelines &&
              <Table
                columns={this.state.columns}
                itemProvider={this.state.pipelines}
                className="release-table"
              />
            }
          </div>
        </Card>
      </div>


      </Page>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));
