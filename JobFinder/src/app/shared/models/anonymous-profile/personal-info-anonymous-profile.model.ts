import { BasicModel } from "../../../core/models";

export interface PersonalInfoAnonymousProfileModel {
    id: number;
    gender: BasicModel<number>;
    citizenship: BasicModel<number>;
    city: string;
}
