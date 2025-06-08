import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'nomenclature/';

export class NomenclatureController {

    static getGenderOptionsUrl = (): string => Route + 'gender';
    static getCountriesUrl = (): string => Route + 'countries';
    static getCitizenshipsUrl = (): string => Route + 'citizenships';
    static getBusinessSectorsUrl = (): string => Route + 'business-sectors';
    static getJobCategoriesUrl = (): string => Route + 'job-categories';
    static getJobEngagementsUrl = (): string => Route + 'job-engagements';
    static getEducationLevelsUrl = (): string => Route + 'education-levels';
    static getLanguageTypesUrl = (): string => Route + 'language-types';
    static getLanguageLevelsUrl = (): string => Route + 'language-levels';
    static getDrivingCategoriesUrl = (): string => Route + 'driving-categories';
    static getCititesUrl = (): string => Route + 'cities';
    static getCurrenciesUrl = (): string => Route + 'currencies';
    static getRecurringTypesUrl = (): string => Route + 'recurring-types';
    static getSoftSkillsUrl = (): string => Route + 'soft-skills';
    static getTechStacksUrls = (): string => Route + 'tech-stacks';
    static getItAreasUrl = (): string => Route + 'it-areas';
    static getRemoteJobPreferencesUrl = (): string => Route + 'remote-job-preferences';
    static getWorkplaceTypesUrl = (): string => Route + 'workplace-types';
}
