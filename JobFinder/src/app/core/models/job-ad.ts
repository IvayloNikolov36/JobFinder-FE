import { CompanyBasicDetails } from "../../users/models";
import { JobAdListing } from "./job-ad-listing.model";

export interface JobAd extends JobAdListing {
  company: CompanyBasicDetails
}
