import { CourseCertificateInfo, EducationInfo, LanguageInfo, PersonalDetails, SkillsInfo, WorkExperienceInfo } from "../../shared/models";

export interface CvPreviewData {
      pictureUrl: string;
      personalDetails: PersonalDetails;
      languagesInfo: LanguageInfo[];
      workExperiences: WorkExperienceInfo[];
      educations: EducationInfo[];
      courseCertificates: CourseCertificateInfo[];
      skills: SkillsInfo;
}
