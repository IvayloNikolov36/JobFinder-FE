export class AdsFilterProps {
    constructor(
        public items: number,
        public searchText: string | null,
        public locationId: number | null,
        public categoryId: number | null,
        public engagementId: number | null,
        public sortBy: string,
        public isAscending: boolean,
        public specifiedSalary: boolean,
        public intership: boolean
    ) { }
}
