import {
      CourseCertificateInfo,
      EducationInfo,
      LanguageInfo,
      PersonalInfo,
      SkillsInfo,
      WorkExperienceInfo
} from "../../shared/models";

export class CvPreviewData {
      constructor(
            public pictureUrl: string,
            public personalInfo: PersonalInfo,
            public educations: EducationInfo[],
            public workExperiences: WorkExperienceInfo[],
            public languagesInfo: LanguageInfo[],
            public skills: SkillsInfo,
            public courseCertificates: CourseCertificateInfo[],
            public isCvRequested: boolean
      ) { }
}
