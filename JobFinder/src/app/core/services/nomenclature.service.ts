import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BasicModel } from "../models";
import { NomenclatureController } from "../controllers";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NomenclatureService {

  constructor(private http: HttpClient) { }

  getEducationLevels(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getEducationLevelsUrl());
  }

  getLanguageLevels(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getLanguageLevelsUrl());
  }

  getLanguageTypes(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getLanguageTypesUrl());
  }

  getCountries(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getCountriesUrl());
  }

  getCitizenships(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getCitizenshipsUrl());
  }

  getBusinessSectors(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getBusinessSectorsUrl());
  }

  getGenderOptions(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getGenderOptionsUrl());
  }

  getDrivingCategories(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getDrivingCategoriesUrl());
  }

  getJobCategories(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getJobCategoriesUrl());
  }

  getJobEngagements(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getJobEngagementsUrl());
  }

  getCities(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getCititesUrl());
  }

  getCurrcencies(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getCurrenciesUrl());
  }

  getRecurringTypes(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getRecurringTypesUrl());
  }

  getSoftSkills(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getSoftSkillsUrl());
  }

  getTechStacks(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getTechStacksUrls());
  }

  getITAreas(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getItAreasUrl());
  }

  getWorkplaceTypes(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(NomenclatureController.getWorkplaceTypesUrl());
  }
}
