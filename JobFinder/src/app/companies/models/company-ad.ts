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
    isActive: boolean;
    publishDate: Date;
    salary: string | null;
}
