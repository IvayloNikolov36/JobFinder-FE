import { CompanyBasicDetails } from "../company-basic-details.model";
import { JobAdBasicDetails } from "../job-ad/job-ad-basic-details.model";

export interface CvRequestListingModel {
    id: number;
    jobAd: JobAdBasicDetails;
    company: CompanyBasicDetails;
    requestDate: Date;
    acceptedDate: Date | null;
}
