import { JobAd } from "../../users/models/job-ad/job-ad.model";
import { JobAdCreate } from "./job-ad-create.model";

export interface JobAdEditModel extends JobAdCreate {
    activate: boolean;
}
