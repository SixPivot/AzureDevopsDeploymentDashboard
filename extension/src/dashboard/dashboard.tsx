/// <reference types="vss-web-extension-sdk" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
import { Header } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
import { renderSimpleCell, Table } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { IPipelineContentState } from "./api/types";
import { getPipelines } from "./api/AzureDevopsClient";
import { Pipeline } from "azure-devops-extension-api/Pipelines/Pipelines";

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


    getPipelines().then((arg: any) => {
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
        <Header
          title="Deployment Dashboard!"
        />
        <Card className="margin-16 bolt-page-white">
          <div className="margin-8">
            {
              !this.state.pipelines &&
              <p>Loading...</p>
            }
            {
              this.state.pipelines &&
              <Table
                columns={this.state.columns}
                itemProvider={this.state.pipelines}
              />
            }
          </div>
        </Card>
      </Page>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));
