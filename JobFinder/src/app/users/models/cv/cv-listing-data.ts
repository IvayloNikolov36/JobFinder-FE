import {
  CourseCertificateInfo,
  EducationInfo,
  LanguageInfo,
  PersonalDetails,
  SkillsInfo,
  WorkExperienceInfo
} from "../../../shared/models";

export interface CvListingData {
  id: string;
  name: string;
  pictureUrl: string;
  createdOn: Date;
  anonymousProfileActivated: boolean;
  canActivateAnonymousProfile: boolean;
  personalDetails: PersonalDetails;
  languagesInfo: LanguageInfo[];
  workExperiences: WorkExperienceInfo[];
  educations: EducationInfo[];
  courseCertificates: CourseCertificateInfo[];
  skills: SkillsInfo;
}
