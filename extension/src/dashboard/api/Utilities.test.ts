import { sortByConvention } from '../../api/Utilities'
import { IDashboardEnvironmentColumn } from './types'

test('Items should be sorted by sortOrder, then by name', () => {
    const renderCell = function (): JSX.Element {
        throw new Error('Function not implemented.')
    }

    const items: IDashboardEnvironmentColumn[] = [
        {
            conventionSortOrder: 4,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'prod',
        },
        {
            conventionSortOrder: 2,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'uat-b',
        },
        {
            conventionSortOrder: 2,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'uat-a',
        },
        {
            conventionSortOrder: 3,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'preprod',
        },
        {
            conventionSortOrder: 1,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'dev',
        },
    ]

    const sorted = sortByConvention(items)

    expect(sorted.map((x) => x.conventionSortOrder)).toEqual([1, 2, 2, 3, 4])
    expect(sorted.map((x) => x.conventionSortOrder)).not.toEqual([4, 2, 2, 3, 1])

    expect(sorted.map((x) => x.name)).toEqual(['dev', 'uat-a', 'uat-b', 'preprod', 'prod'])
    expect(sorted.map((x) => x.name)).not.toEqual(['prod', 'uat-b', 'uat-a', 'preprod', 'dev'])
})
