import {
    CourseCertificateInfo,
    EducationInfoAnonymousProfileModel,
    LanguageInfo,
    PersonalInfoAnonymousProfileModel,
    SkillsInfo,
    WorkExperienceInfoAnonymousProfileModel
} from "../../shared/models";

export interface AnonymousProfileDataModel {
    personalInfo: PersonalInfoAnonymousProfileModel;
    educationInfo: EducationInfoAnonymousProfileModel[];
    workExperienceInfo: WorkExperienceInfoAnonymousProfileModel[];
    languagesInfo: LanguageInfo[];
    skillsInfo: SkillsInfo;
    coursesInfo: CourseCertificateInfo[];
}
