import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { getJobAllApplications } from "../../../core/controllers";
import { AdApplicationInfo } from "../../models";

@Injectable({
  providedIn: 'root'
})
export class CompanyJobAdApplicationsService {

  constructor(private http: HttpClient) { }

  getJobAllApplicationsData = (jobAdId: number): Observable<AdApplicationInfo[]> => {
    return this.http.get<AdApplicationInfo[]>(getJobAllApplications(jobAdId));
  }
}