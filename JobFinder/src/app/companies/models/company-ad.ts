export interface CompanyAd {
    id: number;
    position: string;
    jobCategory: string;
    minSalary: number | null;
    maxSalary: number | null;
    currency: string | null;
    location: string;
    applicationsSent: number;
    notPreviewedApplications: number;
    lifecycleStatusId: number;
    publishDate: Date;
    salary: string | null;
}
