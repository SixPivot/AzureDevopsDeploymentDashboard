import {
  EnvironmentDeploymentExecutionRecord,
  TaskResult,
} from "azure-devops-extension-api/TaskAgent";
import { Pipeline } from "azure-devops-extension-api/Pipelines/Pipelines";
import { ITableColumn } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { IStatusProps } from "azure-devops-ui/Status";

export interface IPipelineContentState {
  pipelines?: ArrayItemProvider<any>;
  columns: ITableColumn<any>[];
  isLoading: boolean;
}

export interface LatestPipeline {
  [key: string]: {
    deployment: EnvironmentDeploymentExecutionRecord;
    pipeline: Pipeline | undefined;
  };
}

export interface EnvironmentPipelines {
  name: string;
  pipelines: LatestPipeline;
  sortOrder?: number;
}

export interface IStatusIndicatorData {
  statusProps: IStatusProps;
  label: string;
}

export interface IDashboardColumn<T> extends ITableColumn<T> {
  sortOrder: number | undefined
}

export interface ReleaseInfo {
  value: string;
  result: TaskResult;
  folder?: string;
  finishTime: Date;
  uri: string;
}

/* Example: {Dev: { value: "20240715.2", finishTime: "1 Jul 2024, 01:37 PM", result: 0}} Where Dev is environment name. And dynamically added as dictionary key*/
export interface EnvironmentReleaseDictionary {
  [index: string]: ReleaseInfo;
}

export interface PipelineInfo {
  name: string;
  uri: string;
  environments: EnvironmentReleaseDictionary;
}

export interface DashboardEnvironmentPipelineInfo {
  environments: EnvironmentPipelines[];
  pipelines: ArrayItemProvider<PipelineInfo>;
}
