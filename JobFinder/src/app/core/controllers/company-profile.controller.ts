import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'company-profile/';

export class CompanyProfileController {
    static companyProfileData = (): string => Route;
    static changeLogo = (): string => Route + 'change-logo';
}
