export interface CvPreviewRequestDataModel {
    id: number;
    cvId: string | null;
    jobAdId: number;
    position: string;
    requestDate: Date;
    acceptedDate: string | null;
}
