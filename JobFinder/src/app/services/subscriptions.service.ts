import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  getAllMyJobSubscriptions,
  getMyCompanySubscriptions,
  subscribeForCompanyJobs,
  subscribeForJobWithCriterias,
  unsubscribeForAllCompanyJobs,
  unsubscribeForCompanyJobs,
  unsubscribeFromAllJobs,
  unsubscribeFromJobs
} from "../core/controllers";
import { Observable } from "rxjs";
import { CompanySubscription, JobSubscription } from "../users/models";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private http: HttpClient) { }

  subscribeForJobsWithCriterias(jobCategoryId: number | null, location: string | null): Observable<object> {
    return this.http.post(subscribeForJobWithCriterias(), { jobCategoryId, location });
  }

  unsubscribeForJobsWithCriterias(subscriptionId: number): Observable<object> {
    return this.http.get<object>(unsubscribeFromJobs(subscriptionId));
  }

  unsubscribeForAllJobsWithCriterias(): Observable<object> {
    return this.http.get<object>(unsubscribeFromAllJobs());
  }

  getAllMyJobSubscriptions(): Observable<JobSubscription[]> {
    return this.http.get<JobSubscription[]>(getAllMyJobSubscriptions());
  }

  subscribeForCompanyJobs(companyId: number): Observable<object> {
    return this.http.get<object>(subscribeForCompanyJobs(companyId));
  }

  unsubscribeForCompanyJobs(companyId: number): Observable<object> {
    return this.http.get<object>(unsubscribeForCompanyJobs(companyId));
  }

  unsubscribeFromAllCompanies(): Observable<object> {
    return this.http.get<object>(unsubscribeForAllCompanyJobs());
  }

  getMyCompanySubscriptions(): Observable<CompanySubscription[]> {
    return this.http.get<CompanySubscription[]>(getMyCompanySubscriptions());
  }
}
