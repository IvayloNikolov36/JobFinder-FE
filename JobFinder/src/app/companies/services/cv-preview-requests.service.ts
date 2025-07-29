import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CvPreviewRequestController } from "../../core/controllers";
import { CvPreviewRequestDataModel } from "../models";

@Injectable({
    providedIn: 'root'
})
export class CvPreviewRequestsService {

    constructor (private http: HttpClient) { }

    getAllCvRequestsData = (): Observable<CvPreviewRequestDataModel[]> => {
        return this.http.get<CvPreviewRequestDataModel[]>(CvPreviewRequestController.getAllCompanyCvRequestData());
    } 
}
