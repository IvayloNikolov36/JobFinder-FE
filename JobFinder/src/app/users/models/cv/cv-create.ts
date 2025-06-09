import {
  EducationOutput,
  LanguageInfoOutput,
  PersonalInfoOutput,
  SkillsInfoOutput,
  WorkExperienceOutput
} from ".";
import { CourseCertificateInfo } from "../../../shared/models";

export interface CvCreate {
  name: string;
  pictureUrl: string;
  personalInfo: PersonalInfoOutput;
  educations: EducationOutput[];
  workExperiences: WorkExperienceOutput[];
  languagesInfo: LanguageInfoOutput[];
  skills: SkillsInfoOutput;
  courseCertificates: CourseCertificateInfo[];
}
