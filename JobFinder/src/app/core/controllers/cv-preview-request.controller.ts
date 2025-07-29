import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'cv-requests';

export class CvPreviewRequestController {
    static getAllCvRequests = (): string => Route;
    static requestCv = (): string => Route;
    static acceptRequest = (id: number): string => Route + `/${id}/accept`;
    static getAllCompanyCvRequestData = (): string => Route + `/all`;
}
