import { AdsFilterProps } from "./ads-filter-props";

export class AdsFiltering extends AdsFilterProps {

    constructor(public page: number, filterProps: AdsFilterProps) {
        super(
            filterProps.items,
            filterProps.searchText,
            filterProps.locationId,
            filterProps.categoryId,
            filterProps.engagementId,
            filterProps.sortBy,
            filterProps.isAscending
        );
    }
}
