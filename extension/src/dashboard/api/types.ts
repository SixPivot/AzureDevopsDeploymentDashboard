import { EnvironmentDeploymentExecutionRecord  } from "azure-devops-extension-api/TaskAgent";
import { Pipeline } from "azure-devops-extension-api/Pipelines/Pipelines";
import { ITableColumn } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { IStatusProps } from "azure-devops-ui/Status";

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
  sortOrder?: number;
}

export interface IStatusIndicatorData {
  statusProps: IStatusProps;
  label: string;
}

export interface TableColumn {
  id: string,
  name: string,
  renderCell: (
    rowIndex: number,
    columnIndex: number,
    tableColumn: ITableColumn<any>,
    tableItem: any
  ) => JSX.Element,
  width: number,
  sortOrder: number | undefined
}