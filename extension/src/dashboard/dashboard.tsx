 /// <reference types="vss-web-extension-sdk" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
import { Header } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
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

interface LatestPipeline {
  [key: string]: EnvironmentDeploymentExecutionRecord
}

interface EnvironmentPipelines {
  name: string,
  pipelines: LatestPipeline
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
    
    // first get environments
    // for-each environment get deployment execution records
    // for each record filter by latest by pipeline
    
    client.getEnvironments("ReleaseDashboard").then((environments) => {
      let pipeline_promises : Array<Promise<EnvironmentPipelines>> = [];
      environments.forEach((environment) => {
        let promise : Promise<EnvironmentPipelines> = new Promise<EnvironmentPipelines>((resolve, reject) => {
          client
              .getEnvironmentDeploymentExecutionRecords("ReleaseDashboard", environment.id)
              .then((pipelines) => {
                resolve(pipeline_handler(environment.name, pipelines));
              });
        });
        pipeline_promises.push(promise);
      });
      
      Promise.all(pipeline_promises)
          .then((environments) => {
            console.info(environments);
            const columns = this.generateColumns(environments);
            const rows = this.generateRows(environments)
            this.setState({
              columns: columns,
              pipelines: new ArrayItemProvider(rows)
            });
          });
    });
    
    let pipeline_handler = (name: string, pipelines: EnvironmentDeploymentExecutionRecord[]) : Promise<EnvironmentPipelines> => {
      let latest_pipelines : LatestPipeline = {};

      pipelines.forEach((pipeline) => {
        if (latest_pipelines[pipeline.definition.name]) return;

        latest_pipelines[pipeline.definition.name] = pipeline;
      });

      return Promise.resolve({name, pipelines: latest_pipelines});
    }
    
    const buildApi = getClient(BuildRestClient);
    /*buildApi.getBuilds("ReleaseDashboard").then(console.info);
    buildApi.getBuild("ReleaseDashboard", 919).then(console.info); //*/
  }

  generateColumns(environments: EnvironmentPipelines[]): Array<any> {
    let columns = [];
    columns.push({
      id: "name",
      name: "",
      renderCell: renderSimpleCell,
      width: 300
    });
    const dynamicColumns = environments.map(environment => {
      return {
        id: environment.name,
        name: environment.name,
        renderCell: renderSimpleCell,
        width: 200
      }
    });
    columns = columns.concat(dynamicColumns);
    console.log(columns);
    return columns;
  }

  generateRows(environments: EnvironmentPipelines[]): Array<any> {
    const rows: Array<any> = [];
    
    environments.forEach(environment => {
      console.log(Object.keys(environment.pipelines));
      Object.keys(environment.pipelines).forEach(pipelineName => {
        let row = rows.find(pr => pr.name == pipelineName);
        if (!row) {
          row = { name: pipelineName };
          rows.push(row);
        }
        row[environment.name] = environment.pipelines[pipelineName].owner.name;
      });
    });
    return rows;
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
