 /// <reference types="vss-web-extension-sdk" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
import { Header } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { getClient } from "azure-devops-extension-api";
import { CoreRestClient } from "azure-devops-extension-api/Core";
import { BuildRestClient } from "azure-devops-extension-api/Build";
import { TaskAgentRestClient, EnvironmentDeploymentExecutionRecord } from "azure-devops-extension-api/TaskAgent";

import { Table, ITableColumn, renderSimpleCell } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";

interface IPipelineContentState {
  pipelines?: ArrayItemProvider<any>;
  columns: ITableColumn<any>[];
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
      },
      {
        id: "dev",
        name: "Dev",
        renderCell: renderSimpleCell,
        width: 200
      },
      {
        id: "test",
        name: "Test",
        renderCell: renderSimpleCell,
        width: 200
      },
      {
        id: "prod",
        name: "Prod",
        renderCell: renderSimpleCell,
        width: 200
      }],
      pipelines: new ArrayItemProvider([
        {
          name: 'Sample Pipeline 1',
          dev: 'v5.3.2',
          test: 'v5.3.0',
          prod: 'v5.0.1'
        }
      ])
    };
  }

  public componentDidMount() {
    SDK.init();
    
    const client = getClient(TaskAgentRestClient);
    interface LatestPipeline {
      [key: string]: EnvironmentDeploymentExecutionRecord
    }
    client.getEnvironmentDeploymentExecutionRecords("ReleaseDashboard", 5).then((pipelines ) => {
      let latest_pipelines : LatestPipeline = {};
      
      pipelines.forEach((pipeline) => {
        if (latest_pipelines[pipeline.definition.name]) return;

        latest_pipelines[pipeline.definition.name] = pipeline;
      });
      
      console.info(latest_pipelines);
    });
    client.getEnvironments("ReleaseDashboard").then(console.info);
      
    const buildApi = getClient(BuildRestClient);
    /*buildApi.getBuilds("ReleaseDashboard").then(console.info);
    buildApi.getBuild("ReleaseDashboard", 919).then(console.info); //*/
  }

  public render(): JSX.Element {
    return (
      <Page className="flex-grow">
        <Header
          title="Deployment Dashboard!"
        />
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
      </Page>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));
