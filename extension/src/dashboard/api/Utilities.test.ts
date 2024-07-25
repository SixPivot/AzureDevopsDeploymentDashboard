import { IDashboardEnvironmentColumn } from './types'
import { sortEnvironmentsByconvention } from './Utilities'

test('Items should be sorted by sortOrder, then by name', () => {
    const renderCell = function (): JSX.Element {
        throw new Error('Function not implemented.')
    }

    const items: IDashboardEnvironmentColumn[] = [
        {
            sortOrder: 4,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'prod',
        },
        {
            sortOrder: 2,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'uat-b',
        },
        {
            sortOrder: 2,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'uat-a',
        },
        {
            sortOrder: 3,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'preprod',
        },
        {
            sortOrder: 1,
            id: '',
            renderCell: renderCell,
            width: 0,
            name: 'dev',
        },
    ]

    const sorted = sortEnvironmentsByconvention(items)

    expect(sorted.map((x) => x.sortOrder)).toEqual([1, 2, 2, 3, 4])
    expect(sorted.map((x) => x.sortOrder)).not.toEqual([4, 2, 2, 3, 1])

    expect(sorted.map((x) => x.name)).toEqual(['dev', 'uat-a', 'uat-b', 'preprod', 'prod'])
    expect(sorted.map((x) => x.name)).not.toEqual(['prod', 'uat-b', 'uat-a', 'preprod', 'dev'])
})
