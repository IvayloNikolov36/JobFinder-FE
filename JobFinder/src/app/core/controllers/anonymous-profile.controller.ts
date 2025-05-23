import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'AnonymousProfile/';

export const activate = (): string => route + 'activate';