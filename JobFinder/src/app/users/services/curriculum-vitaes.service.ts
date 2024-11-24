import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CvListing, CvListingData, CvCreate } from '../models/cv/';
import { CvCreateResult } from '../models/cv/cv-create-result';
import { getCreateCvUrl, getCvData, getCvsUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaesService {

  constructor(private http: HttpClient) { }

  getUserCVs = (): Observable<CvListing[]> => {
    return this.http.get<CvListing[]>(getCvsUrl());
  }

  getCvListingData = (cvId: string): Observable<CvListingData> => {
    return this.http.get<CvListingData>(getCvData(cvId));
  }

  createCv = (data: CvCreate): Observable<CvCreateResult> => {
    return this.http.post<CvCreateResult>(getCreateCvUrl(), data);
  }
}
