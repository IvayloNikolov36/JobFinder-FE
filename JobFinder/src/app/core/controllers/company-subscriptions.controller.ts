import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'company-subscriptions';

export const subscribeForCompanyJobs = (companyId: number): string => route + `/${companyId}`;
export const unsubscribeForCompanyJobs = (companyId: number): string => route + `/unsubscribe/${companyId}`;
export const unsubscribeForAllCompanyJobs = (): string => route + `/unsubscribe/all`;
export const getMyCompanySubscriptions = (): string => route + '/mine';
