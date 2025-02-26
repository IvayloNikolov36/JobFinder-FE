export interface CompanyAd {
    id: number;
    position: string;
    jobCategory: string;
    salary: string;
    location: string;
    applicationsSent: number;
    notPreviewedApplications: number;
    isActive: boolean;
    publishDate: Date;
}
