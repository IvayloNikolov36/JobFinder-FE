import { AnonymousProfileAppearance } from "./anonymous-profile-appearance";

export interface AnonymousProfileCreate {
    workExpiriencesInfo: number[],
    educationsInfo: number[],
    languagesInfo: number[],
    coursesInfo: number[],
    profileAppearanceCriterias: AnonymousProfileAppearance;
}
