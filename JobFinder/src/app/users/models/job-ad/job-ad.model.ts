import { CompanyBasicDetails } from "..";
import { JobAdListing } from "./job-ad-listing.model";

export interface JobAd extends JobAdListing {
  company: CompanyBasicDetails
}
