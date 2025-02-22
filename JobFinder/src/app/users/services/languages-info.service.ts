import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageInfoInput } from '../models/cv/language-info-input';
import { getUpdateLanguageInfoUrl } from '../../core/controllers';
import { LanguageInfoOutput } from '../models/cv';
import { UpdateResult } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LanguagesInfoService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: LanguageInfoOutput[]): Observable<UpdateResult> {
    return this.http.put<UpdateResult>(getUpdateLanguageInfoUrl(cvId), data);
  }

  mapLanguageInfoData = (data: LanguageInfoInput[]): LanguageInfoOutput[] => {
    return data.map((element: LanguageInfoInput) => {
      const result: LanguageInfoOutput = {} as LanguageInfoOutput;
      result.id = element.id;
      result.comprehensionLevelId = element.comprehensionLevel.id;
      result.writingLevelId = element.writingLevel.id;
      result.speakingLevelId = element.speakingLevel.id;
      result.languageTypeId = element.languageType.id;

      return result;
    });
  }
}
