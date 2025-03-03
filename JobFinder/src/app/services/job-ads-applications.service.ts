import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { applyForJob, getMyJobApplications, setPreviewInfo } from "../core/controllers";
import { JobAdApplication, JobAdApplicationDetails } from "../models";
import { ApplicationPreviewInfo } from "../companies/models";

@Injectable({
    providedIn: 'root'
})
export class JobAdsApplicationsService {

    constructor(private http: HttpClient) { }

    applyForJob = (jobAdApplication: JobAdApplication): Observable<object> => {
        return this.http.post(applyForJob(), jobAdApplication);
    }

    getAllMyJobApplications = (): Observable<JobAdApplicationDetails[]> => {
        return this.http.get<JobAdApplicationDetails[]>(getMyJobApplications());
    }

    // TODO: create two separate services and move to concreate modules

    setPreviewInfo = (cvId: string, jobAdId: number): Observable<ApplicationPreviewInfo> => {
        return this.http.post<ApplicationPreviewInfo>(setPreviewInfo(), { cvId, jobAdId });
    }
}
