import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BasicModel } from "../../models";
import { getBusinessSectorsUrl, getCitizenshipsUrl, getCountriesUrl, getEducationLevelsUrl, getGenderOptionsUrl, getLanguageLevelsUrl, getLanguageTypesUrl } from "../controllers";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NomenclatureService {

  constructor(private http: HttpClient) {

  }

  getEducationLevels(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getEducationLevelsUrl());
  }

  getLanguageLevels(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getLanguageLevelsUrl());
  }

  getLanguageTypes(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getLanguageTypesUrl());
  }

  getCountries(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getCountriesUrl());
  }

  getCitizenships(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getCitizenshipsUrl());
  }

  getBusinessSectors(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getBusinessSectorsUrl());
  }

  getGenderOptions(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getGenderOptionsUrl());
  }
}
