import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;
const controllerName: string = 'ads-applications';

export const applyForJob = (): string => `${route}${controllerName}`;
export const getMyJobApplications = (): string => `${route}${controllerName}`;
export const getJobAllApplications = (jobAdId: number): string => `${route}${controllerName}/${jobAdId}`;
export const setPreviewInfo = (): string => `${route}${controllerName}/preview-info`;
