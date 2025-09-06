import { JobAd } from "./job-ad";
import { JobAdCreate } from "./job-ad-create.model";

export interface JobAdEditModel extends JobAdCreate {
    activate: boolean;
}
