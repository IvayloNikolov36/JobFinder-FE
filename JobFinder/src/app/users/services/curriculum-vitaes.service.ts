import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CvListing, CvListingData, CvCreate } from '../models/cv/';
import { CvCreateResult } from '../models/cv/cv-create-result';
import { getCreateCvUrl, getOwnCvData, getAllMine, getDeleteCvUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaesService {

  constructor(private http: HttpClient) { }

  getAllMine = (): Observable<CvListing[]> => {
    return this.http.get<CvListing[]>(getAllMine());
  }

  getCvListingData = (cvId: string): Observable<CvListingData> => {
    return this.http.get<CvListingData>(getOwnCvData(cvId));
  }

  create = (data: CvCreate): Observable<CvCreateResult> => {
    return this.http.post<CvCreateResult>(getCreateCvUrl(), data);
  }

  delete = (id: string): Observable<Object> => {
    return this.http.delete<Object>(getDeleteCvUrl(id));
  }
}
