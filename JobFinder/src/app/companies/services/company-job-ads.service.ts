import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { JobAd } from "../../core/models";
import { createAd, getAllCompanyAds, getCompanyAds, getRelatedAnonymousProfilesUrl } from "../../core/controllers";
import { AnonymousProfileListingModel, CompanyAd } from "../models";

@Injectable({
    providedIn: "root"
})
export class CompanyJobAdsService {

    constructor(private http: HttpClient) { }

    createJobAd(data: JobAd): Observable<Object> {
        return this.http.post(createAd(), data);
    }

    getAllCompanyAds(): Observable<CompanyAd[]> {
        return this.http.get<CompanyAd[]>(getAllCompanyAds());
    }

    getCompanyAds(active: boolean): Observable<CompanyAd[]> {
        return this.http.get<CompanyAd[]>(getCompanyAds(active));
    }

    getRelatedAnonymousProfiles(jobAdId: number | undefined): Observable<AnonymousProfileListingModel[]> {
        return jobAdId !== undefined
            ? this.http.get<AnonymousProfileListingModel[]>(getRelatedAnonymousProfilesUrl(jobAdId))
            : of([]);
    }
}
