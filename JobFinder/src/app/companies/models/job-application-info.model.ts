import { CvBasicDetails } from "./cv-basic-details.model";

export interface JobApplicationInfo {
    id: number;
    jobAdId: number;
    applicant: string;
    cv: CvBasicDetails;
    email: string;
    phone: string;
    appliedOn: Date;
    previewDate: Date;
}
