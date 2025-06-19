import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'jobAds';

export class JobAdsController {
    static getAds = (): string => Route;
    static getAllCompanyAds = (): string => Route + '/company/all';
    static getCompanyAds = (active: boolean): string => Route + `/company/${active}`;
    static getAd = (id: number) => Route + `/${id}`;
    static createAd = (): string => Route + '/create';
    static getRelatedAnonymousProfiles = (jobAdId: number): string => Route + `/${jobAdId}/anonymous-profiles`;
}
