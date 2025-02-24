import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;

export const applyForJob = (): string => route + 'JobAdsApplications';
