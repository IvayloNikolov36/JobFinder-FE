import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'subscriptions';

export const subscribeForJobWithCriterias = (): string => route + '/subscribe';
export const unsubscribeForJobs = (subscriptionId: number): string => route + `/unsubscribe/${subscriptionId}`;
