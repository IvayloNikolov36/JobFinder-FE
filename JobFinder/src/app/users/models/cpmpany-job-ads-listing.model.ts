import { JobAdListing } from "../../core/models";
import { CompanyBasicDetails } from "./company-basic-details.model";

export interface CompanyJobAdsListing {
    companyDetails: CompanyBasicDetails,
    ads: JobAdListing[];
}
