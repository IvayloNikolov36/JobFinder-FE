import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseCertificate } from '../models/cv/course-certificate';
import { getUpdateCvCourseUrl } from '../../core/controllers';
import { UpdateResult } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: CourseCertificate[]): Observable<UpdateResult> {
    return this.http.put<UpdateResult>(getUpdateCvCourseUrl(cvId), data);
  }
}
