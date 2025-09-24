import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'companies/';

export class CompaniesController {
    static getDetailsUrl = (companyId: number): string => Route + `${companyId}`;
    static getActiveAdsUrl = (companyId: number): string => Route + `${companyId}/ads`;
    static getAllUrl = (): string => Route + 'all';
}
