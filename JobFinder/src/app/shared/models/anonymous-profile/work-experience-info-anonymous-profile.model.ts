import { BasicModel } from "../../../core/models";

export interface WorkExperienceInfoAnonymousProfileModel {
      fromDate: string;
      toDate: string;
      jobTitle: string;
      businessSector: BasicModel;
      location: string;
      additionalDetails: string | null;
}
