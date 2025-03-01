import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseCertificateInfo } from '../../shared/models/course-certificate-info';
import { getUpdateCvCourseUrl } from '../../core/controllers';
import { UpdateResult } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: CourseCertificateInfo[]): Observable<UpdateResult> {
    return this.http.put<UpdateResult>(getUpdateCvCourseUrl(cvId), data);
  }
}
