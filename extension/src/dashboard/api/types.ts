import { EnvironmentDeploymentExecutionRecord  } from "azure-devops-extension-api/TaskAgent";
import { Pipeline } from "azure-devops-extension-api/Pipelines/Pipelines";
import { ITableColumn } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";

export interface IPipelineContentState {
  pipelines?: ArrayItemProvider<any>;
  columns: ITableColumn<any>[];
}

export interface LatestPipeline {
  [key: string]: {
    deployment: EnvironmentDeploymentExecutionRecord;
    pipeline: Pipeline | undefined
  };
}

export interface EnvironmentPipelines {
  name: string;
  pipelines: LatestPipeline;
}
