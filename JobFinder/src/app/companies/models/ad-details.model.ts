import { JobAd } from "./job-ad-create.model";

export interface AdDetails extends JobAd {
    id: number;
    lifecycleStatusId: number;
}
