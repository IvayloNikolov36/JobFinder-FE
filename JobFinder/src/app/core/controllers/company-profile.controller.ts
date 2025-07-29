import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'company-profile';

export const getCompanyProfileData = (): string => route;
