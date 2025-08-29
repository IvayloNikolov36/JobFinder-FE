export interface AdDetails {
    id: number;
    position: string;
    description: string;
    lifecycleStatusId: number;
    minSalary: number | null;
    maxSalary: number | null;
    currencyId: number | null;
    jobCategoryId: number;
    jobEngagementId: number;
    intership: boolean;
    locationId: number;
    softSkills: number[];
    techStacks: number[];
    itAreas: number[];
    workplaceTypeId: number;
}
