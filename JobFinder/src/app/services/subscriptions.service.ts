import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { subscribeForJobWithCriterias, unsubscribeForJobs } from "../core/controllers";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private http: HttpClient) { }

  subscribeForJobsWithCriterias(jobCategoryId: number | null, location: string | null): Observable<object> {
    return this.http.post(subscribeForJobWithCriterias(), { jobCategoryId, location });
  }

  unsubscribeFromJobs(subscriptionId: number): Observable<object> {
    return this.http.get<object>(unsubscribeForJobs(subscriptionId));
  }
}
