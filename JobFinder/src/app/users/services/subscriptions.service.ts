import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  getMyCompanySubscriptions,
  subscribeForCompanyJobs,
  SubscriptionsController,
  unsubscribeForAllCompanyJobs,
  unsubscribeForCompanyJobs,
} from "../../core/controllers";
import { CompanySubscription, JobSubscription, JobSubscriptionCriterias } from "../models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private http: HttpClient) { }

  subscribeForJobsWithCriterias(criterias: JobSubscriptionCriterias): Observable<object> {
    return this.http.post(SubscriptionsController.subscribeForJobWithCriterias(), criterias);
  }

  unsubscribeForJobsWithCriterias(subscriptionId: number): Observable<object> {
    return this.http.get<object>(SubscriptionsController.unsubscribeFromJobs(subscriptionId));
  }

  unsubscribeForAllJobsWithCriterias(): Observable<object> {
    return this.http.get<object>(SubscriptionsController.unsubscribeFromAllJobs());
  }

  getAllMyJobSubscriptions(): Observable<JobSubscription[]> {
    return this.http.get<JobSubscription[]>(SubscriptionsController.getAllMyJobSubscriptions());
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
