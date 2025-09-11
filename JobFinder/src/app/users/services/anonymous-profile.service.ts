import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnonymousProfileCreate } from "../models";
import { AnonymousProfilesController, CvPreviewRequestController } from "../../core/controllers";
import { CvRequestListingModel } from "../models/cv";
import { IdentityResult } from "../../core/models";

@Injectable({
    providedIn: 'root'
})
export class AnonymousProfileService {

    constructor(private http: HttpClient) { }

    view = (): Observable<object> => {
        return this.http.get<object>(AnonymousProfilesController.getMine());
    }

    create = (cvId: string, profileData: AnonymousProfileCreate)
        : Observable<IdentityResult<string>> => {
        return this.http
            .post<IdentityResult<string>>(AnonymousProfilesController.create(cvId), profileData);
    }

    delete = (id: string): Observable<object> => {
        return this.http.delete(AnonymousProfilesController.delete(id));
    }

    viewAllCvRequests = (): Observable<CvRequestListingModel[]> => {
        return this.http.get<CvRequestListingModel[]>(CvPreviewRequestController.getAllCvRequests());
    }

    acceptCvPreviewRequest = (cvPreviewRequestId: number): Observable<object> => {
        return this.http.get<object>(CvPreviewRequestController.acceptRequest(cvPreviewRequestId));
    }
}
