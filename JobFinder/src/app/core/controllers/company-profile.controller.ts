import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'CompanyProfile';

export const getCompanyProfileData = (): string => route;
