import { BasicModel } from "../../core/models";

export interface EducationInfo {
  id: number;
  organization: string;
  fromDate: Date;
  toDate: Date;
  location: string;
  educationLevel: BasicModel<number>;
  major: string;
  mainSubjects: string;
  includeInAnonymousProfile: boolean | null;
}
