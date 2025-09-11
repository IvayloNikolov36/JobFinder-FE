import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { JobApplicationInfo } from "../models";
import { getJobAllApplications, setPreviewInfo } from "../../core/controllers";

@Injectable({
  providedIn: 'root'
})
export class CompanyJobAdApplicationsService {

  constructor(private http: HttpClient) { }

  getJobAllApplicationsData = (jobAdId: number | undefined): Observable<JobApplicationInfo[]> => {
    if (!jobAdId) {
      return of([]);
    }
    return this.http.get<JobApplicationInfo[]>(getJobAllApplications(jobAdId));
  }

  setPreviewInfo = (cvId: string, jobAdId: number): Observable<object> => {
    return this.http.post<object>(setPreviewInfo(), { cvId, jobAdId });
  }
}
