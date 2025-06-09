import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'AnonymousProfile/';

export class AnonymousProfileController {
    static view = (): string => Route + 'view';
    static create = (cvId: string): string => Route + `create/${cvId}`;
    static delete = (id: string): string => Route + `delete/${id}`;
}