import * as React from 'react'
import { ITreeColumn, renderExpandableTreeCell, Tree } from 'azure-devops-ui/TreeEx'
import { ITreeItem, ITreeItemEx, TreeItemProvider } from 'azure-devops-ui/Utilities/TreeItemProvider'
import { ArrayItemProvider, IItemProvider } from 'azure-devops-ui/Utilities/Provider'
import { IReadonlyObservableValue } from 'azure-devops-ui/Core/Observable'
import { IDeploymentTableItem, IPipelineInstance } from '../api/types'
import { IEnvironmentInstance } from '../../api/types'
import { SimpleTableCell } from 'azure-devops-ui/Table'
import { Status, StatusSize } from 'azure-devops-ui/Status'
import { getStatusIndicatorData } from '../../api/Utilities'
import { Link } from 'azure-devops-ui/Link'
import { Ago } from 'azure-devops-ui/Ago'
import { useState, useEffect } from 'react'
import { ITreeItemProvider } from 'azure-devops-ui/Utilities/TreeItemProvider'
import { AgoFormat } from 'azure-devops-ui/Utilities/Date'

export const TreeViewTable = (props: {
    environments: IEnvironmentInstance[]
    pipelines: ArrayItemProvider<IPipelineInstance>
}): JSX.Element => {
    const { environments, pipelines } = props
    const [folderViewItemProvider, setFolderViewItemProvider] = useState<ITreeItemProvider<IDeploymentTableItem>>()

    useEffect(() => {
        if (pipelines && environments) buildTreeView()
    }, [pipelines, environments])

    const buildTreeView = () => {
        let treeNodeItems: ITreeItem<IDeploymentTableItem>[] = []
        pipelines!.value.forEach((pipeline: IPipelineInstance) => {
            let folder = pipeline.environments[Object.keys(pipeline.environments)[0]]?.folder!
            let paths = folder.split('\\')

            // Remove the first empty path, set paths to [] at root level
            paths.shift()
            if (paths.length === 1 && paths[0] === '') paths = []

            addToTreeNodes(treeNodeItems, paths, pipeline)
        })

        setFolderViewItemProvider(new TreeItemProvider<IDeploymentTableItem>(treeNodeItems))
    }

    const addToTreeNodes = (pathChildren: ITreeItem<IDeploymentTableItem>[], paths: string[], pipelineInfo: IPipelineInstance) => {
        if (paths.length === 0) {
            pathChildren.push({
                data: {
                    name: pipelineInfo.name,
                    pipeline: pipelineInfo,
                } as IDeploymentTableItem,
                childItems: [],
                expanded: true,
            })
        } else {
            let existingNode = pathChildren.find((item) => item.data.name === paths[0])

            if (!existingNode) {
                existingNode = {
                    data: {
                        name: paths[0],
                    } as IDeploymentTableItem,
                    childItems: [],
                    expanded: true,
                }

                pathChildren.push(existingNode)
            }

            paths.shift()
            addToTreeNodes(existingNode!.childItems!, paths, pipelineInfo)
        }
    }

    const getFolderViewColumns = (): ITreeColumn<IDeploymentTableItem>[] => {
        let columns: ITreeColumn<IDeploymentTableItem>[] = []

        columns.push({
            id: 'name',
            name: '',
            width: 300,
            renderCell: renderExpandableTreeCell,
        })

        let dynamicColumns = environments.map((env) => {
            return {
                id: env.name!,
                name: env.name,
                width: !env.name ? 300 : 200,
                renderCell: !env.name ? renderExpandableTreeCell : renderTreeViewCell,
                isFixedColumn: true,
            }
        })

        return columns.concat(dynamicColumns)
    }

    const renderTreeViewCell = <T extends IDeploymentTableItem>(
        _rowIndex: number,
        columnIndex: number,
        treeColumn: ITreeColumn<T>,
        treeItem: ITreeItemEx<T>,
        _ariaRowIndex?: number | undefined,
        _role?: string
    ): JSX.Element => {
        let pipeline = treeItem.underlyingItem.data.pipeline

        // If row isn't a leaf node, then return no data indicator, or if environment is not applicable to the pipeline
        if (
            (treeItem.underlyingItem.childItems && treeItem.underlyingItem.childItems.length > 0) ||
            !pipeline.environments[treeColumn!.name!]
        )
            return (
                <SimpleTableCell key={'col-' + columnIndex} columnIndex={columnIndex}>
                    <div className="no-data">-</div>
                </SimpleTableCell>
            )

        return (
            <SimpleTableCell
                columnIndex={columnIndex}
                tableColumn={treeColumn}
                key={'col-' + columnIndex}
                contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m bolt-table-cell-content-with-inline-link"
            >
                <div className="flex-row flex-start">
                    <Status
                        {...getStatusIndicatorData(pipeline.environments[treeColumn!.name!].result).statusProps}
                        className="icon-large-margin status-icon"
                        size={StatusSize.m}
                    />
                    <div className="flex-column wrap-text">
                        <Link
                            className="bolt-table-inline-link bolt-table-link no-underline-link"
                            target="_top"
                            href={pipeline.environments[treeColumn!.name!].uri}
                        >
                            {pipeline.environments[treeColumn!.name!].value}
                        </Link>
                        <div className="finish-date">
                            <Ago date={pipeline.environments[treeColumn!.id!].finishTime} format={AgoFormat.Extended} />
                        </div>
                    </div>
                </div>
            </SimpleTableCell>
        )
    }

    return (
        <>
            {folderViewItemProvider && (
                <Tree<IDeploymentTableItem>
                    className="deployments-table"
                    ariaLabel="Basic tree"
                    columns={getFolderViewColumns()}
                    itemProvider={
                        folderViewItemProvider as IItemProvider<
                            ITreeItemEx<IDeploymentTableItem> | IReadonlyObservableValue<ITreeItemEx<IDeploymentTableItem>>
                        >
                    }
                    onToggle={(event, treeItem: ITreeItemEx<IDeploymentTableItem>) => {
                        console.log('event', event)
                        folderViewItemProvider!.toggle(treeItem.underlyingItem)
                    }}
                    scrollable={true}
                />
            )}
        </>
    )
}
