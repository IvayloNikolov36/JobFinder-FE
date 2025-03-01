import { BasicModel } from "../../models";

export interface WorkExperienceInfo {
  id: number;
  fromDate: string;
  toDate: string;
  jobTitle: string;
  organization: string;
  businessSector: BasicModel;
  location: string;
  additionalDetails: string;
}
