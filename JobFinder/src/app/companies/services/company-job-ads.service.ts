import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JobAd } from "../../models";
import { createAd, getCompanyAds } from "../../core/controllers";
import { CompanyAd } from "../models";

@Injectable({
    providedIn: "root"
})
export class CompanyJobAdsService {

    constructor(private http: HttpClient) { }

    createJobAd(data: JobAd): Observable<Object> {
        return this.http.post(createAd(), data);
    }

    getCompanyAds(): Observable<CompanyAd[]> {
        return this.http.get<CompanyAd[]>(getCompanyAds());
    }
}
