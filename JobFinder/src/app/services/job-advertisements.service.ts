import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobAd } from '../models/job-ad';
import { JobDetails } from '../models/job-details';
import { getAd, getAds } from '../core/controllers';
import { JobAdsFilter } from '../models';

@Injectable({
  providedIn: 'root'
})
export class JobAdvertisementsService {

  constructor(private http: HttpClient) { }

  getAll(filter: JobAdsFilter): Observable<JobAd[]> {
    return this.http.post<JobAd[]>(getAds(), filter);
  }

  details(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(getAd(id));
  }
}
