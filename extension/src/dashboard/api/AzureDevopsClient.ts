import { renderSimpleCell } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { getClient } from "azure-devops-extension-api";
import { PipelinesRestClient } from "azure-devops-extension-api/Pipelines/PipelinesClient";
import {
  EnvironmentDeploymentExecutionRecord,
  TaskAgentRestClient,
} from "azure-devops-extension-api/TaskAgent";
import { EnvironmentPipelines, LatestPipeline } from "./types";
import { Pipeline } from "azure-devops-extension-api/Pipelines/Pipelines";

const project = "ReleaseDashboard";
export async function getPipelines() {
  const taskAgentClient = getClient(TaskAgentRestClient);
  const pipelinesClient = getClient(PipelinesRestClient);

  const [pipelines, environments] = await Promise.all([
    pipelinesClient.listPipelines(project),
    taskAgentClient.getEnvironments(project),
  ]);

  const environmentPipelines: EnvironmentPipelines[] = [];
  for (const environment of environments) {
    const task = await taskAgentClient
      .getEnvironmentDeploymentExecutionRecords(
        project,
        environment.id,
      );
    const environmentPipeline: EnvironmentPipelines = {
      name: environment.name,
      pipelines: {},
    };
    for (const pipeline of task) {
      if (!environmentPipeline.pipelines[pipeline.definition.name]) {
        const data = pipelines.find(p => p.id == pipeline.definition.id);
        environmentPipeline.pipelines[pipeline.definition.name] = {
          deployment: pipeline,
          pipeline: data
        };
      }
    }
    environmentPipelines.push(environmentPipeline);
  }

  const columns = generateColumns(environmentPipelines);
  const rows = generateRows(environmentPipelines);
  return {
    columns: columns,
    pipelines: new ArrayItemProvider(rows),
  };
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

  for(const environment of environments){

    console.log(Object.keys(environment.pipelines));

    for(const pipelineName of Object.keys(environment.pipelines)){
      let row = rows.find((pr) => pr.name == pipelineName);
      
      if (!row) {
        row = { name: pipelineName };
        rows.push(row);
      }
      
      row[environment.name] = environment.pipelines[pipelineName].deployment.owner.name;
    }
  }
  return rows;
}
