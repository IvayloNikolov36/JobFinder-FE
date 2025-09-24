import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyListing } from "../models/company-listing.model";
import { CompaniesController } from "../../core/controllers";

@Injectable({ providedIn: 'root' })
export class CompaniesService {

    constructor(private http: HttpClient) {}

    getAll = (): Observable<CompanyListing[]> => {
        return this.http.get<CompanyListing[]>(CompaniesController.getAllUrl());
    }
}
