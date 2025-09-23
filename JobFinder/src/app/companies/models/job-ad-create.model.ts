export class JobAdCreate {
    constructor(
        public position: string,
        public description: string,
        public minSalary: number | null,
        public maxSalary: number | null,
        public currencyId: number | null,
        public jobCategoryId: number,
        public jobEngagementId: number,
        public intership: boolean,
        public locationId: number,
        public softSkills: number[],
        public techStacks: number[],
        public itAreas: number[],
        public workplaceTypeId: number
    ) { }
}
