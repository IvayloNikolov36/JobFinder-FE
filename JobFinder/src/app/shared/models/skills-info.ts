import { BasicModel } from "../../core/models";

export interface SkillsInfo {
  id: number;
  cvId: string;
  computerSkills: string | null;
  otherSkills: string | null;
  hasManagedPeople: boolean;
  drivingLicenseCategories: BasicModel<number>[];
  licenseCategoriesText: string;
}
