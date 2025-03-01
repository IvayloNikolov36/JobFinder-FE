import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EducationOutput } from '../models/cv';
import { EducationInfo } from '../../shared/models';
import { getCvEducationsEditUrl } from '../../core/controllers';
import { UpdateResult } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: EducationOutput[]): Observable<UpdateResult> {
    return this.http.put<UpdateResult>(getCvEducationsEditUrl(cvId), data);
  }

  public mapEducationInfoData = (data: EducationInfo[]): EducationOutput[] => {
    return data.map((item: EducationInfo) => {
      return {
        id: item.id,
        organization: item.organization,
        fromDate: item.fromDate,
        toDate: item.toDate,
        location: item.location,
        educationLevelId: item.educationLevel.id,
        major: item.major,
        mainSubjects: item.mainSubjects
      } as EducationOutput;
    });
  }
}
