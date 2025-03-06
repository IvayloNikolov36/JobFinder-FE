import { PersonalDetails } from "../models";

export function getFullName(details: PersonalDetails): string {
    return `${details.firstName} ${details.middleName} ${details.lastName}`;
}