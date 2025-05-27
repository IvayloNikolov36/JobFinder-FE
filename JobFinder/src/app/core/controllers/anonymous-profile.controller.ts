import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'AnonymousProfile/';

export class AnonymousProfileController {
    static view = (): string => Route + 'view';
    static activate = (cvId: string): string => Route + `${cvId}/activate`;
    static deactivate = (cvId: string): string => Route + `${cvId}/deactivate`;
}