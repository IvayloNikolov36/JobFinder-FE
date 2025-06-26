import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnonymousProfileController } from "../../core/controllers";
import { AnonymousProfileDataModel, CvPreviewRequestModel } from "../models";

@Injectable({
    providedIn: 'root'
})
export class CompanyAnonymousProfilesService {

    constructor(private http: HttpClient) { }

    preview = (id: string, jobAdId: number): Observable<AnonymousProfileDataModel> => {
        return this.http.get<AnonymousProfileDataModel>(AnonymousProfileController.preview(id, jobAdId));
    }

    requestCv = (request: CvPreviewRequestModel): Observable<Object> => {
        return this.http.post(AnonymousProfileController.requestCv(), request);
    }
}
