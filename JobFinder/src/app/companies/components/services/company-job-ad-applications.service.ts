import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { getJobAllApplications } from "../../../core/controllers";
import { AdApplicationInfo } from "../../models";

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
}