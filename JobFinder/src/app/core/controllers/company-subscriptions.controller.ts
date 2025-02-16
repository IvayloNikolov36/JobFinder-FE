import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'CompanySubscriptions';

export const subscribeForCompanyJobs = (companyId: number): string => route + `/${companyId}`;
export const unsubscribeForCompanyJobs = (companyId: number): string => route + `/unsubscribe/${companyId}`;
export const getMyCompanySubscriptions = (): string => route + '/mine';
