export interface CvPreviewRequestDataModel {
    id: number;
    anonymousProfileId: string;
    cvId: string;
    jobAdId: number;
    position: string;
    requestDate: Date;
    acceptedDate: string | null;
}
