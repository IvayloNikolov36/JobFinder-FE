import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;
const controllerName: string = 'JobAdsApplications';

export const applyForJob = (): string => `${route}${controllerName}`;
export const getMyJobApplications = (): string => `${route}${controllerName}/mine`;
export const getJobAllApplications = (jobAdId: number): string => `${route}${controllerName}/${jobAdId}`;
