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

  getEducationLevels(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getEducationLevelsUrl());
  }

  getLanguageLevels(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getLanguageLevelsUrl());
  }

  getLanguageTypes(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getLanguageTypesUrl());
  }

  getCountries(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getCountriesUrl());
  }

  getCitizenships(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getCitizenshipsUrl());
  }

  getBusinessSectors(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getBusinessSectorsUrl());
  }

  getGenderOptions(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getGenderOptionsUrl());
  }

  getDrivingCategories(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getDrivingCategoriesUrl());
  }

  getJobCategories(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getJobCategoriesUrl());
  }

  getJobEngagements(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getJobEngagementsUrl());
  }

  getCities(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getCititesUrl());
  }

  getCurrcencies(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getCurrenciesUrl());
  }

  getRecurringTypes(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getRecurringTypesUrl());
  }

  getSoftSkills(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getSoftSkillsUrl());
  }

  getTechStacks(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getTechStacksUrls());
  }

  getITAreas(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getItAreasUrl());
  }

  getWorkplaceTypes(): Observable<BasicModel<number>[]> {
    return this.http.get<BasicModel<number>[]>(NomenclatureController.getWorkplaceTypesUrl());
  }
}
