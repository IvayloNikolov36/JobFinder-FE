import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'subscriptions/';

export class SubscriptionsController {
    static subscribeForJobWithCriterias = (): string => Route + 'subscribe';
    static unsubscribeFromJobs = (subscriptionId: number): string => Route + `unsubscribe/${subscriptionId}`;
    static unsubscribeFromAllJobs = (): string => Route + "unsubscribe/all";
    static getAllMyJobSubscriptions = (): string => Route + 'mine';
}
