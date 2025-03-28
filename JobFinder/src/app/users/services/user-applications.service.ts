import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { applyForJob, getMyJobApplications } from "../../core/controllers";
import { JobAdApplication, JobAdApplicationDetails } from "../models";

@Injectable({
    providedIn: 'root'
})
export class UserApplicationsService {

    constructor(private http: HttpClient) { }

    applyForJob = (jobAdApplication: JobAdApplication): Observable<object> => {
        return this.http.post(applyForJob(), jobAdApplication);
    }

    getAllMyJobApplications = (): Observable<JobAdApplicationDetails[]> => {
        return this.http.get<JobAdApplicationDetails[]>(getMyJobApplications());
    }
}
