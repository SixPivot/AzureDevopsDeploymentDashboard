import { IDashboardEnvironmentColumn } from './types'

function applySortOrderToColumn(column: IDashboardEnvironmentColumn, groupWord: string, groupSortOrder: number) {
    if (column.sortOrder) return

    const name = column.name!.trim().toLowerCase()

    if (name.startsWith(groupWord)) column.sortOrder = groupSortOrder + 1
    else if (name.endsWith(groupWord)) column.sortOrder = groupSortOrder + 3
    else if (name.indexOf(groupWord) >= 0) column.sortOrder = groupSortOrder + 2
}

function applySortOrderOnEnvironmentsByconvention(columns: IDashboardEnvironmentColumn[]) {
    columns.forEach((column) => {
        if (column.sortOrder === 0) return

        applySortOrderToColumn(column, 'dev', 10)
        applySortOrderToColumn(column, 'test', 30)
        applySortOrderToColumn(column, 'uat', 40)
        applySortOrderToColumn(column, 'preprod', 50)
        applySortOrderToColumn(column, 'prod', 60)

        if (!column.sortOrder) column.sortOrder = 20
    })
}

export function sortEnvironmentsByconvention(array: IDashboardEnvironmentColumn[]): IDashboardEnvironmentColumn[] {
    applySortOrderOnEnvironmentsByconvention(array)
    return array.sort((a, b) => {
        // Compare by sortOrder first
        if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
            if (a.sortOrder !== b.sortOrder) {
                return a.sortOrder - b.sortOrder
            }
        } else if (a.sortOrder !== undefined) {
            return -1
        } else if (b.sortOrder !== undefined) {
            return 1
        }

        // If sortOrder is the same or undefined for both, compare by name
        if (a.name! < b.name!) {
            return -1
        } else if (a.name! > b.name!) {
            return 1
        } else {
            return 0
        }
    })
}
