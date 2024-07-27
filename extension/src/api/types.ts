export interface ISortableByConvention {
    conventionSortOrder: number
    name?: string
}

export interface IEnvironmentInstance extends ISortableByConvention {}

export enum ExtensionDataKeys {
    Environments = 'Environments',
}
