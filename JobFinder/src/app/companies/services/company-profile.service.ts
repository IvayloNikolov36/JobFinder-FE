import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyProfileData } from "../models";
import { getCompanyProfileData } from "../../core/controllers";

@Injectable({
    providedIn: 'root'
})
export class CompanyProfileService {

    constructor(private http: HttpClient) { }

    getProfileData = (): Observable<CompanyProfileData> => {
        return this.http.get<CompanyProfileData>(getCompanyProfileData());
    }
}
