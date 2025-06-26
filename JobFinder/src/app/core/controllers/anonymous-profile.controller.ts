import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'AnonymousProfile/';

export class AnonymousProfileController {
    static getMine = (): string => Route + 'get';
    static create = (cvId: string): string => Route + `create/${cvId}`;
    static delete = (id: string): string => Route + `delete/${id}`;
    static preview = (id: string, jobAdId: number): string => Route + `view/${id}/${jobAdId}`;
    static requestCv = (): string => Route + 'cv-request';
}
