import { PersonalInfo } from "../models";

export function getFullName(details: PersonalInfo): string {
    return `${details.firstName} ${details.middleName} ${details.lastName}`;
}