import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperienceOutput } from './../models/cv/';
import { getUpdateWorkExperienceInfoUrl } from '../../core/controllers';
import { Observable } from 'rxjs';
import { UpdateResult } from '../../core/models';
import { WorkExperienceInfo } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class WorkExperiencesService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: WorkExperienceOutput[]): Observable<UpdateResult> {
    return this.http.put<UpdateResult>(getUpdateWorkExperienceInfoUrl(cvId), data);
  }

  mapWorkExperienceInfoData = (data: WorkExperienceInfo[]): WorkExperienceOutput[] => {
    return data.map((element: WorkExperienceInfo) => {
      return {
        id: element.id,
        fromDate: element.fromDate,
        toDate: element.toDate,
        jobTitle: element.jobTitle,
        organization: element.organization,
        businessSectorId: element.businessSector.id,
        location: element.location,
        additionalDetails: element.additionalDetails
      } as WorkExperienceOutput
    });
  }
}
