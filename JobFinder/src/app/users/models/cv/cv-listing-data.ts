import {
  CourseCertificateInfo,
  EducationInfo,
  LanguageInfo,
  PersonalInfo,
  SkillsInfo,
  WorkExperienceInfo
} from "../../../shared/models";

export interface CvListingData {
  id: string;
  name: string;
  pictureUrl: string;
  createdOn: Date;
  anonymousProfileId: string | null;
  canActivateAnonymousProfile: boolean;
  personalInfo: PersonalInfo;
  languagesInfo: LanguageInfo[];
  workExperiences: WorkExperienceInfo[];
  educations: EducationInfo[];
  courseCertificates: CourseCertificateInfo[];
  skills: SkillsInfo;
  applicationForActiveAd: boolean;
  approvedCvPreviewForActiveAd: boolean;
}
