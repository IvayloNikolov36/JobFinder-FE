export interface CvRequestListingModel {
    id: number;
    jobAdId: number;
    position: string;
    companyName: string;
    companyLogoUrl: string;
    requestDate: Date;
    acceptedDate: Date | null;
}
