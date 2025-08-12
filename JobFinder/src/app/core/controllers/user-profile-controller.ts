import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'user-profile';

export const getMyProfileData = (): string => route;
