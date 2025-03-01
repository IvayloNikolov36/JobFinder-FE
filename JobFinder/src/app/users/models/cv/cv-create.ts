import {
  EducationOutput,
  LanguageInfoOutput,
  PersonalDetailsOutput,
  SkillsInfoOutput,
  WorkExperienceOutput
} from ".";
import { CourseCertificateInfo } from "../../../shared/models";

export interface CvCreate {
  name: string;
  pictureUrl: string;
  personalDetails: PersonalDetailsOutput;
  educations: EducationOutput[];
  workExperiences: WorkExperienceOutput[];
  languagesInfo: LanguageInfoOutput[];
  skills: SkillsInfoOutput;
  courseCertificates: CourseCertificateInfo[];
}
