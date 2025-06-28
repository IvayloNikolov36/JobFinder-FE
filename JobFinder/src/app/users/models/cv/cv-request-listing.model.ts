export interface CvRequestListingModel {
    jobAdId: number;
    position: string;
    companyName: string;
    companyLogoUrl: string;
    requestDate: Date;
    acceptedDate: Date | null;
}
