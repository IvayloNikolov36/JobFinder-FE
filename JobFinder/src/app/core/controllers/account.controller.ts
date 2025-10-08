import { environment } from "../../../environments/environment";

const Route: string = environment.apiUrl + 'account/';

export class AccountController {
    static loginUrl = (): string => Route + 'login';
    static registerCompanyUrl = (): string => Route + 'register-company';
    static registerUserUrl = (): string => Route + 'register-user';
    static changePasswordUrl = (): string => Route + 'change-password';
    static forgottenPasswordUrl = (): string => Route + 'forgotten-password';
    static resetPasswordUrl = (): string => Route + 'reset-password';
}
