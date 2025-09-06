import { JobAdCreate } from "./job-ad-create.model";

export interface AdDetails extends JobAdCreate {
    id: number;
    lifecycleStatusId: number;
}
