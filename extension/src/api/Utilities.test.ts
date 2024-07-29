import { sortByConvention } from './Utilities'
import { ISortableByConvention } from './types'

test('Items should be sorted by sortOrder, then by name', () => {
    const items: ISortableByConvention[] = [
        {
            conventionSortOrder: 4,
            name: 'prod',
        },
        {
            conventionSortOrder: 2,
            name: 'uat-b',
        },
        {
            conventionSortOrder: 2,
            name: 'uat-a',
        },
        {
            conventionSortOrder: 3,
            name: 'preprod',
        },
        {
            conventionSortOrder: 1,
            name: 'dev',
        },
    ]

    const sorted = sortByConvention(items)

    expect(sorted.map((x) => x.conventionSortOrder)).toEqual([1, 2, 2, 3, 4])
    expect(sorted.map((x) => x.conventionSortOrder)).not.toEqual([4, 2, 2, 3, 1])

    expect(sorted.map((x) => x.name)).toEqual(['dev', 'uat-a', 'uat-b', 'preprod', 'prod'])
    expect(sorted.map((x) => x.name)).not.toEqual(['prod', 'uat-b', 'uat-a', 'preprod', 'dev'])
})
