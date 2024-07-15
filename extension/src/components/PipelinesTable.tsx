import { ITableColumn, Table } from "azure-devops-ui/Table"
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import * as React from "react";

export const PipelinesTable = (props: { 
    columns: ITableColumn<any>[]; 
    pipelines?: ArrayItemProvider<any> }) => {
    const { columns, pipelines } = props
    return <Table
        columns={columns}
        itemProvider={pipelines}
    />
}