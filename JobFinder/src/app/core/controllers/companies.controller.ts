import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'company/';

export class CompaniesController {

    static getDetailsUrl = (companyId: number): string => Route + `details/${companyId}`;
}
