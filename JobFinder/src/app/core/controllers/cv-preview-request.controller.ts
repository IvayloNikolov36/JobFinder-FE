import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'CvPreviewRequest/';

export class CvPreviewRequestController {
    static getAllCvRequests = (): string => Route + 'cv-requests';
    static requestCv = (): string => Route + 'cv-request';
    static acceptRequest = (id: number): string => Route + `allow-cv-preview/${id}`;
    static getCompanyAllCvRequestData = (): string => Route + `all-requests`;
}
