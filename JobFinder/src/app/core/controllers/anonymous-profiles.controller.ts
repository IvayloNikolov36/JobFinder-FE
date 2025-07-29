import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'anonymous-profiles/';

export class AnonymousProfilesController {
    static getMine = (): string => Route + 'mine';
    static create = (cvId: string): string => Route + `${cvId}`;
    static delete = (id: string): string => Route + `${id}`;
    static preview = (id: string, jobAdId: number): string => Route + `${id}/${jobAdId}`;
}
