import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AdDetails, AnonymousProfileListingModel, CompanyAd, JobAd } from "../models";
import { JobAdsController } from "../../core/controllers";
import { IdentityResult } from "../../core/models";

@Injectable({
    providedIn: "root"
})
export class CompanyJobAdsService {

    constructor(private http: HttpClient) { }

    get(id: number): Observable<AdDetails> {
        return this.http.get<AdDetails>(JobAdsController.get(id));
    }

    createJobAd(data: JobAd): Observable<IdentityResult<number>> {
        return this.http.post<IdentityResult<number>>(JobAdsController.create(), data);
    }

    updateJobAd(id: number, data: JobAd): Observable<Object> {
        return this.http.put(JobAdsController.update(id), data);
    }

    activate(id: number): Observable<void> {
        return this.http.get<void>(JobAdsController.activate(id));
    }

    retire(id: number): Observable<Object> {
        return this.http.get(JobAdsController.retire(id), {});
    }

    getAllCompanyAds(): Observable<CompanyAd[]> {
        return this.http.get<CompanyAd[]>(JobAdsController.getAllCompanyAds());
    }

    getCompanyAds(active: boolean): Observable<CompanyAd[]> {
        return this.http.get<CompanyAd[]>(JobAdsController.getCompanyAds(active));
    }

    getRelatedAnonymousProfiles(jobAdId: number | undefined): Observable<AnonymousProfileListingModel[]> {
        return jobAdId !== undefined
            ? this.http.get<AnonymousProfileListingModel[]>(JobAdsController.getRelatedAnonymousProfiles(jobAdId))
            : of([]);
    }
}
