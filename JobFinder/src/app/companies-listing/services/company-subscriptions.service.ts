import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { subscribeForCompanyJobs, unsubscribeForCompanyJobs } from "../../core/controllers";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CompanySubscriptionsService {

    constructor(private http: HttpClient) { }

    subscribeForCompanyJobs(companyId: number): Observable<object> {
        return this.http.get<object>(subscribeForCompanyJobs(companyId));
    }

    unsubscribeFromCompany(companyId: number): Observable<object> {
        return this.http.get<object>(unsubscribeForCompanyJobs(companyId));
    }
}
