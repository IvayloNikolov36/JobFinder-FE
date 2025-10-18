import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyProfileData } from "../models";
import { CompanyProfileController } from "../../core/controllers";
import { CloudImageModel } from "../../core/models";

@Injectable({
    providedIn: 'root'
})
export class CompanyProfileService {

    constructor(private http: HttpClient) { }

    getProfileData = (): Observable<CompanyProfileData> => {
        return this.http.get<CompanyProfileData>(CompanyProfileController.companyProfileData());
    }

    changeCompanyLogo(file: File): Observable<CloudImageModel> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        return this.http.post<CloudImageModel>(
            CompanyProfileController.changeLogo(),
            formData,
            { headers });
    }
}
