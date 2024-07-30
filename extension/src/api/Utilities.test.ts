import { sortByConvention, merge } from './Utilities'
import { ISortableByConvention } from './types'

describe('sortByConvention', () => {
    it('should sort by convention', () => {
        const array = [
            { name: 'Test-QA', conventionSortOrder: undefined },
            { name: 'Prod-AUE', conventionSortOrder: undefined },
            { name: 'DEV-General', conventionSortOrder: undefined },
            { name: 'DEV', conventionSortOrder: undefined },
            { name: 'UAT', conventionSortOrder: undefined },
            { name: 'NZ-UAT', conventionSortOrder: undefined },
            { name: 'AU-UAT-SE', conventionSortOrder: undefined },
            { name: 'PreProdNZ', conventionSortOrder: undefined },
            { name: 'PreProdAU', conventionSortOrder: undefined },
            { name: 'TeamDev', conventionSortOrder: undefined },
            { name: 'AUEprod01', conventionSortOrder: undefined },
            { name: 'AUE-Prod', conventionSortOrder: undefined },
        ] as ISortableByConvention[]

        const sortedArray = sortByConvention(array)

        expect(sortedArray).toEqual([
            { name: 'DEV', conventionSortOrder: 11 },
            { name: 'DEV-General', conventionSortOrder: 11 },
            { name: 'TeamDev', conventionSortOrder: 13 },
            { name: 'Test-QA', conventionSortOrder: 31 },
            { name: 'UAT', conventionSortOrder: 41 },
            { name: 'AU-UAT-SE', conventionSortOrder: 42 },
            { name: 'NZ-UAT', conventionSortOrder: 43 },
            { name: 'PreProdAU', conventionSortOrder: 51 },
            { name: 'PreProdNZ', conventionSortOrder: 51 },
            { name: 'Prod-AUE', conventionSortOrder: 61 },
            { name: 'AUEprod01', conventionSortOrder: 62 },
            { name: 'AUE-Prod', conventionSortOrder: 63 },
        ])
    })
})

describe('merge function', () => {
    it('should add new items from sourceOfTruth', () => {
        const sourceOfTruth = [{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }]
        const comparisonArray = [{ name: 'item1' }, { name: 'item2' }]
        const result = merge(sourceOfTruth, comparisonArray)
        expect(result).toEqual([{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }])
    })

    it('should remove items not present in sourceOfTruth', () => {
        const sourceOfTruth = [{ name: 'item1' }, { name: 'item2' }]
        const comparisonArray = [{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }]
        const result = merge(sourceOfTruth, comparisonArray)
        expect(result).toEqual([{ name: 'item1' }, { name: 'item2' }])
    })

    it('should return the same array when no changes', () => {
        const sourceOfTruth = [{ name: 'item1' }, { name: 'item2' }]
        const comparisonArray = [{ name: 'item1' }, { name: 'item2' }]
        const result = merge(sourceOfTruth, comparisonArray)
        expect(result).toEqual([{ name: 'item1' }, { name: 'item2' }])
    })
})
