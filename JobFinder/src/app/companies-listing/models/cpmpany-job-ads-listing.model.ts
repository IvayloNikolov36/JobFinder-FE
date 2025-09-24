import { CompanyBasicDetails } from "../../users/models/company-basic-details.model";
import { JobAdListing } from "../../users/models/job-ad";

export interface CompanyJobAdsListing {
    companyDetails: CompanyBasicDetails,
    ads: JobAdListing[];
}
