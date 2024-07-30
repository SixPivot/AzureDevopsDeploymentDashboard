import { Statuses } from 'azure-devops-ui/Status'
import { IEnvironmentInstance, ISortableByConvention } from '../api/types'
import { IStatusIndicatorData } from '../dashboard/api/types'

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

/**
 * 
 * Using convention to order environments in the Dashboard UI in the following manner:
 * Dev environments come first, followed by miscellaneous environments (ones can't be matched), followed by test environments, then by pre-production/pre-release environments and finally production environments
 * Example:
 * DEV-General | TeamDev | Test-QA | UAT | PreProdAU | Prod-AUE | AUEprod01 | AUE-Prod
 * In order to fulfill this we will have a list of words (that commonly used in environment names) to consider when ordering:
    Dev
    Test
    UAT
    PreProd
    Prod
 * @param array sortable items
 * @returns Sorted items by convention
 */
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

export function merge(sourceOfTruth: IEnvironmentInstance[], comparisonArray: IEnvironmentInstance[]): IEnvironmentInstance[] {
    const comparisonNames = new Set(comparisonArray.map((item) => item.name))
    const sourceNames = new Set(sourceOfTruth.map((item) => item.name))

    const newItems = sourceOfTruth.filter((item) => !comparisonNames.has(item.name))
    const removedItems = comparisonArray.filter((item) => !sourceNames.has(item.name))

    return comparisonArray.filter((i) => !removedItems.some((ri) => i.name === ri.name)).concat(newItems)
}

export function getStatusIndicatorData(status: number): IStatusIndicatorData {
    const indicatorData: IStatusIndicatorData = {
        label: 'Success',
        statusProps: { ...Statuses.Success, ariaLabel: 'Success' },
    }

    switch (status) {
        case 2:
            indicatorData.statusProps = {
                ...Statuses.Failed,
                ariaLabel: 'Failed',
            }
            indicatorData.label = 'Failed'
            break
        case 3:
            indicatorData.statusProps = {
                ...Statuses.Canceled,
                ariaLabel: 'Canceled',
            }
            indicatorData.label = 'Canceled'
            break
        case 4:
            indicatorData.statusProps = {
                ...Statuses.Skipped,
                ariaLabel: 'Skipped',
            }
            indicatorData.label = 'Skipped'
            break
        case 5:
            indicatorData.statusProps = {
                ...Statuses.Skipped,
                ariaLabel: 'Abandoned',
            }
            indicatorData.label = 'Abandoned'
            break
    }

    return indicatorData
}
