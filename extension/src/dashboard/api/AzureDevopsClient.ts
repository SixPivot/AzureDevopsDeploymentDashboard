import { renderSimpleCell } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import {
  EnvironmentDeploymentExecutionRecord,
  TaskAgentRestClient,
} from "azure-devops-extension-api/TaskAgent";
import { EnvironmentPipelines, LatestPipeline } from "./types";

export function getPipelines(client: TaskAgentRestClient) {
  // first get environments
  // for-each environment get deployment execution records
  // for each record filter by latest by pipeline
  let pipeline_handler = (
    name: string,
    pipelines: EnvironmentDeploymentExecutionRecord[],
  ): Promise<EnvironmentPipelines> => {
    let latest_pipelines: LatestPipeline = {};

    pipelines.forEach((pipeline) => {
      if (latest_pipelines[pipeline.definition.name]) return;

      latest_pipelines[pipeline.definition.name] = pipeline;
    });

    return Promise.resolve({ name, pipelines: latest_pipelines });
  };

  return client.getEnvironments("ReleaseDashboard").then((environments) => {
    let pipeline_promises: Array<Promise<EnvironmentPipelines>> = [];
    environments.forEach((environment) => {
      let promise: Promise<EnvironmentPipelines> = new Promise<
        EnvironmentPipelines
      >((resolve, reject) => {
        client
          .getEnvironmentDeploymentExecutionRecords(
            "ReleaseDashboard",
            environment.id,
          )
          .then((pipelines) => {
            resolve(pipeline_handler(environment.name, pipelines));
          });
      });
      pipeline_promises.push(promise);
    });

    return Promise.all(pipeline_promises)
      .then((environments) => {
        console.info(environments);
        const columns = generateColumns(environments);
        const rows = generateRows(environments);
        return {
          columns: columns,
          pipelines: new ArrayItemProvider(rows),
        };
      });
  });
}

function generateColumns(environments: EnvironmentPipelines[]): Array<any> {
  let columns = [];
  columns.push({
    id: "name",
    name: "",
    renderCell: renderSimpleCell,
    width: 300,
  });
  const dynamicColumns = environments.map((environment) => {
    return {
      id: environment.name,
      name: environment.name,
      renderCell: renderSimpleCell,
      width: 200,
    };
  });
  columns = columns.concat(dynamicColumns);
  console.log(columns);
  return columns;
}

function generateRows(environments: EnvironmentPipelines[]): Array<any> {
  const rows: Array<any> = [];

  environments.forEach((environment) => {
    console.log(Object.keys(environment.pipelines));
    Object.keys(environment.pipelines).forEach((pipelineName) => {
      let row = rows.find((pr) => pr.name == pipelineName);
      if (!row) {
        row = { name: pipelineName };
        rows.push(row);
      }
      row[environment.name] = environment.pipelines[pipelineName].owner.name;
    });
  });
  return rows;
}
