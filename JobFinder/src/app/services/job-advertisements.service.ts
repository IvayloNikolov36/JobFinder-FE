import { HttpClient, HttpParams } from '@angular/common/http';
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
    const params = new HttpParams()
      .set('page', filter.page)
      .set('items', filter.itemsCount)
      .set('searchText', filter.searchText)
      .set('location', filter.location !== 'All' ? filter.location : '')
      .set('sortBy', filter.sortBy)
      .set('isAscending', filter.isAscending)
      .set('categoryId', filter.category)
      .set('engagementId', filter.engagement);

    return this.http.get<JobAd[]>(getAds(), { params });
  }

  details(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(getAd(id));
  }
}
