export class JobAdsFilter {
    constructor(
        public page: number,
        public itemsCount: number,
        public searchText: string,
        public locationId: number | null,
        public categoryId: number | null,
        public engagementId: number | null,
        public sortBy: string,
        public isAscending: boolean
    ) { }
}
