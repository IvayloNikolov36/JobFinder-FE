import { BasicModel } from "../../../core/models";

export interface EducationInfoAnonymousProfileModel {
    fromDate: Date;
    toDate: Date;
    organization: string;
    location: string;
    educationLevel: BasicModel<number>;
    major: string;
    mainSubjects: string;
}
