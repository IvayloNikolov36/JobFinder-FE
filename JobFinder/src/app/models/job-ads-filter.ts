export class JobAdsFilter {
    constructor(
        public page: number,
        public itemsCount: number,
        public searchText: string,
        public location: string,
        public category: number,
        public engagement: number,
        public sortBy: string,
        public isAscending: boolean
    ) { }
}
