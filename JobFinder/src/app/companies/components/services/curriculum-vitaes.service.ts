import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { getUserCvData } from "../../../core/controllers";
import { HttpClient } from "@angular/common/http";
import { CvPreviewData } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class CurriculumVitaesService {

    constructor(private http: HttpClient) { }

    getUserCvData = (cvId: string, jobAdId: number): Observable<CvPreviewData> => {
        return this.http.get<CvPreviewData>(getUserCvData(cvId, jobAdId));
    }
}
