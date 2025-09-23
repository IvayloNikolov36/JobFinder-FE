import { CompanyBasicDetails } from "./company-basic-details.model";
import { JobAdListing } from "./job-ad";

export interface CompanyJobAdsListing {
    companyDetails: CompanyBasicDetails,
    ads: JobAdListing[];
}
