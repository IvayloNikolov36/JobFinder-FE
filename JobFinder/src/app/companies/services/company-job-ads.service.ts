import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { JobAd } from "../../core/models";
import { AnonymousProfileListingModel, CompanyAd } from "../models";
import { JobAdsController } from "../../core/controllers";

@Injectable({
    providedIn: "root"
})
export class CompanyJobAdsService {

    constructor(private http: HttpClient) { }

    createJobAd(data: JobAd): Observable<Object> {
        return this.http.post(JobAdsController.create(), data);
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
