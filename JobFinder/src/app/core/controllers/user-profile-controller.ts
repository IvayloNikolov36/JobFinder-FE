import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'user-profile/';

export class UserProfileController {
    static getMyProfileData = (): string => Route;
    static changeProfilePicture = (): string => Route + 'change-picture';
}
