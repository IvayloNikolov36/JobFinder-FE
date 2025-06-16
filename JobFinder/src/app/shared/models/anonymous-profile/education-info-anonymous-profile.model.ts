import { BasicModel } from "../../../core/models";

export interface EducationInfoAnonymousProfileModel {
    fromDate: Date;
    toDate: Date;
    organization: string;
    location: string;
    educationLevel: BasicModel;
    major: string;
    mainSubjects: string;
}
