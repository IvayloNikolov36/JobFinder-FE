import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'ads';

export class JobAdsController {
    static get = (id: number) => Route + `/${id}`;
    static getAds = (): string => Route;
    static getAllCompanyAds = (): string => Route + '/company/all';
    static getCompanyAds = (active: boolean): string => Route + `/company/${active}`;
    static create = (): string => Route + '/create';
    static update = (id: number): string => Route + `/${id}`;
    static activate = (id: number): string => Route + `/${id}/activate`;
    static retire = (id: number): string => Route + `/${id}/retire`;
    static getRelatedAnonymousProfiles = (jobAdId: number): string => Route + `/${jobAdId}/anonymous-profiles`;
}
