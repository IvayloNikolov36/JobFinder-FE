import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'subscriptions';

export const subscribeForJobWithCriterias = (): string => route + '/subscribe';
export const unsubscribeForJobs = (subscriptionId: number): string => route + `/unsubscribe/${subscriptionId}`;
export const subscribeForCompanyJobs = (companyId: number): string => route + `CompanySubscriptions/${companyId}`;
export const unsubscribeForCompanyJobs = (companyId: number): string => route + `CompanySubscriptions/unsubscribe/${companyId}`;
