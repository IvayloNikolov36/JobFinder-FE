import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'ads';

export class JobAdsController {
    static getAds = (): string => Route;
    static getAllCompanyAds = (): string => Route + '/company/all';
    static getCompanyAds = (active: boolean): string => Route + `/company/${active}`;
    static getAdDetails = (id: number) => Route + `/${id}`;
    static create = (): string => Route + '/create';
    static getRelatedAnonymousProfiles = (jobAdId: number): string => Route + `/${jobAdId}/anonymous-profiles`;
}
