import { IEnvironmentInstance, ISortableByConvention } from '../api/types'

function applySortOrder(item: ISortableByConvention, groupWord: string, groupSortOrder: number) {
    if (item.conventionSortOrder) return

    const name = item.name!.trim().toLowerCase()

    if (name.startsWith(groupWord)) item.conventionSortOrder = groupSortOrder + 1
    else if (name.endsWith(groupWord)) item.conventionSortOrder = groupSortOrder + 3
    else if (name.indexOf(groupWord) >= 0) item.conventionSortOrder = groupSortOrder + 2
}

function applySortOrderByConvention(array: ISortableByConvention[]) {
    array.forEach((item) => {
        if (item.conventionSortOrder === 0) return

        applySortOrder(item, 'dev', 10)
        applySortOrder(item, 'test', 30)
        applySortOrder(item, 'uat', 40)
        applySortOrder(item, 'preprod', 50)
        applySortOrder(item, 'prod', 60)

        if (!item.conventionSortOrder) item.conventionSortOrder = 20
    })
}

export function sortByConvention(array: ISortableByConvention[]): ISortableByConvention[] {
    applySortOrderByConvention(array)
    return array.sort((a, b) => {
        // Compare by sortOrder first
        if (a.conventionSortOrder !== undefined && b.conventionSortOrder !== undefined) {
            if (a.conventionSortOrder !== b.conventionSortOrder) {
                return a.conventionSortOrder - b.conventionSortOrder
            }
        } else if (a.conventionSortOrder !== undefined) {
            return -1
        } else if (b.conventionSortOrder !== undefined) {
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

export function detectChanges(
    sourceOfTruth: IEnvironmentInstance[],
    comparisonArray: IEnvironmentInstance[]
): { newItems: IEnvironmentInstance[]; removedItems: IEnvironmentInstance[] } {
    const comparisonNames = new Set(comparisonArray.map((item) => item.name))
    const sourceNames = new Set(sourceOfTruth.map((item) => item.name))

    const newItems = sourceOfTruth.filter((item) => !comparisonNames.has(item.name))
    const removedItems = comparisonArray.filter((item) => !sourceNames.has(item.name))

    return { newItems, removedItems }
}
