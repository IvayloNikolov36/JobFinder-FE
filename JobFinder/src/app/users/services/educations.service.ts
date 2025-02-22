import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education, EducationOutput } from '../models/cv';
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

  public mapEducationInfoData = (data: Education[]): EducationOutput[] => {
    return data.map((item: Education) => {
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
