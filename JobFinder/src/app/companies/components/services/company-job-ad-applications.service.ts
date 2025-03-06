import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { getJobAllApplications, setPreviewInfo } from "../../../core/controllers";
import { AdApplicationInfo, ApplicationPreviewInfo } from "../../models";

@Injectable({
  providedIn: 'root'
})
export class CompanyJobAdApplicationsService {

  constructor(private http: HttpClient) { }

  getJobAllApplicationsData = (jobAdId: number | undefined): Observable<AdApplicationInfo[]> => {
    if (!jobAdId) {
      return of([]);
    }
    return this.http.get<AdApplicationInfo[]>(getJobAllApplications(jobAdId));
  }

  setPreviewInfo = (cvId: string, jobAdId: number): Observable<ApplicationPreviewInfo> => {
    return this.http.post<ApplicationPreviewInfo>(setPreviewInfo(), { cvId, jobAdId });
  }
}
