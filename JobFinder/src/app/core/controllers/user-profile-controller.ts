import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'userProfile';

export const getMyProfileData = (): string => route + "/my-data";
