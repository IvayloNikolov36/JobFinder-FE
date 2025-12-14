import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import {
  getMyCompanySubscriptions,
  SubscriptionsController,
  unsubscribeForAllCompanyJobs,
  unsubscribeForCompanyJobs,
} from "../../core/controllers";
import { CompanySubscription, JobSubscription } from "../models";
import { Observable } from "rxjs";
import { JobsSubscriptionCriterias } from "../../shared/models";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private http: HttpClient = inject(HttpClient);

  private companysubscriptionsRaw = toSignal(this.getMyCompanySubscriptions(), { initialValue: [] });
  companySubscriptions = computed(() => signal(this.companysubscriptionsRaw()));
  companySubs = computed(() => this.companySubscriptions()());

  private jobSubscriptionsRaw = toSignal(this.getAllMyJobSubscriptions(), { initialValue: [] });
  private jobSubscriptions = computed(() => signal(this.jobSubscriptionsRaw()));
  jobSubs = computed(() => this.jobSubscriptions()());

  removeCompanySubscription = (companyId: number): void => {
    this.companySubscriptions().update((current) => [...current.filter(cs => cs.companyId !== companyId)]);
  }

  clearCompanySubscriptions = (): void => {
    this.companySubscriptions().set([]);
  }

  addJobSubscription = (jobsSubscription: JobSubscription): void => {
    this.jobSubscriptions().update((current) => [...current, jobsSubscription]);
  }

  removeJobSubscriptions = (jobSubscriptionId: number): void => {
    this.jobSubscriptions().update((current) => [...current.filter(js => js.id !== jobSubscriptionId)]);
  }

  clearJobSubscriptions = (): void => {
    this.jobSubscriptions().set([]);
  }

  getJobSubscription(jobSubscriptionId: number): JobSubscription {
    return this.jobSubs().find(js => js.id === jobSubscriptionId)!;
  }

  subscribeForJobsWithCriterias(criterias: JobsSubscriptionCriterias): Observable<JobSubscription> {
    return this.http.post<JobSubscription>(SubscriptionsController.subscribeForJobWithCriterias(), criterias);
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

  unsubscribeFromCompany(companyId: number): Observable<object> {
    return this.http.get<object>(unsubscribeForCompanyJobs(companyId));
  }

  unsubscribeFromAllCompanies(): Observable<object> {
    return this.http.get<object>(unsubscribeForAllCompanyJobs());
  }

  getMyCompanySubscriptions(): Observable<CompanySubscription[]> {
    return this.http.get<CompanySubscription[]>(getMyCompanySubscriptions());
  }
}
