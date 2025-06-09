import {
      CourseCertificateInfo,
      EducationInfo,
      LanguageInfo,
      PersonalInfo,
      SkillsInfo,
      WorkExperienceInfo
} from "../../shared/models";

export interface CvPreviewData {
      pictureUrl: string;
      personalInfo: PersonalInfo;
      languagesInfo: LanguageInfo[];
      workExperiences: WorkExperienceInfo[];
      educations: EducationInfo[];
      courseCertificates: CourseCertificateInfo[];
      skills: SkillsInfo;
}
