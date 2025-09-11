import { BasicModel } from "../../../core/models";

export interface WorkExperienceInfoAnonymousProfileModel {
      fromDate: string;
      toDate: string;
      jobTitle: string;
      businessSector: BasicModel<number>;
      location: string;
      additionalDetails: string | null;
}
