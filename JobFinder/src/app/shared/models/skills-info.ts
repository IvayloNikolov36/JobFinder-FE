import { BasicModel } from "../../models";

export interface SkillsInfo {
  id: number;
  cvId: string;
  computerSkills: string;
  otherSkills: string;
  hasManagedPeople: boolean;
  drivingLicenseCategories: BasicModel[];
  licenseCategoriesText: string;
}
