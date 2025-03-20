import { BasicModel } from "../../models";

export interface SkillsInfo {
  id: number;
  cvId: string;
  computerSkills: string | null;
  otherSkills: string | null;
  hasManagedPeople: boolean;
  drivingLicenseCategories: BasicModel[];
  licenseCategoriesText: string;
}
