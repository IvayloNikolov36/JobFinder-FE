import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'AnonymousProfile/';

export const view = (): string => route + 'view';
export const activate = (cvId: string): string => route + `${cvId}/activate`;