import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyListing } from "../models/company-listing.model";
import { CompaniesController } from "../../core/controllers";
import { CompanyDetailsUser, CompanyJobAdsListing } from "../models";

@Injectable({ providedIn: 'root' })
export class CompaniesService {

    constructor(private http: HttpClient) { }

    getAll = (): Observable<CompanyListing[]> => {
        return this.http.get<CompanyListing[]>(CompaniesController.getAllUrl());
    }

    getDetails = (companyId: number): Observable<CompanyDetailsUser> => {
        return this.http.get<CompanyDetailsUser>(CompaniesController.getDetailsUrl(companyId));
    }

    getActiveAds(companyId: number): Observable<CompanyJobAdsListing> {
        return this.http.get<CompanyJobAdsListing>(CompaniesController.getActiveAdsUrl(companyId));
    }
}
