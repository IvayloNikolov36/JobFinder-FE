import { JobAdBasicDetails } from "../../users/models";

export interface CvPreviewRequestDataModel {
    id: number;
    cvId: string | null;
    jobAd: JobAdBasicDetails;
    requestDate: Date;
    acceptedDate: string | null;
}
