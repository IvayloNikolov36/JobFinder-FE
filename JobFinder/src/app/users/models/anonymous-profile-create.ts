export class AnonymousProfileCreate {
    constructor(
        public curriculumVitaeId: string,
        public workExpiriencesInfo: number[],
        public educationsInfo: number[],
        public languagesInfo: number[],
        public coursesInfo: number[]
    ) { }
}
