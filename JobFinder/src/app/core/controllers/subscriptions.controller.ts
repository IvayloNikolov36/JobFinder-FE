import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'subscriptions';

export const subscribeForJobWithCriterias = (): string => route + '/subscribe';
export const unsubscribeFromJobs = (subscriptionId: number): string => route + `/unsubscribe/${subscriptionId}`;
export const unsubscribeFromAllJobs = (): string => route + "/unsubscribe/all";
export const getAllMyJobSubscriptions = (): string => route + '/mine';
