export interface JobsSubscriptionCriterias {
    reccuringTypeId: number;
    jobCategoryId: number | null;
    jobEngagementId: number | null;
    locationId: number | null;
    intership: boolean;
    specifiedSalary: boolean;
    searchTerm: string | null;
}
