export interface CompanyAd {
    id: number;
    position: string;
    jobCategory: string;
    minSalary: number | null;
    maxSalary: number | null;
    currency: number | null;
    location: string;
    applicationsSent: number;
    notPreviewedApplications: number;
    isActive: boolean;
    publishDate: Date;
}
