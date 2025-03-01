import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;

export const getUpdateCvCourseUrl = (cvId: string) => route + `cvs/courses/${cvId}/update`;
export const getCvsUrl = (): string => route + 'cvs/all';
export const getOwnCvData = (cvId: string) => route + `cvs/${cvId}`;
export const getUserCvData = (cvId: string, jobAdId: number) => route + `cvs/preview/${cvId}/${jobAdId}`;
export const getCreateCvUrl = () => route + `cvs/create`;
export const getDeleteCvUrl = (id: string) => route + `cvs/delete/${id}`;
export const getCvEducationsEditUrl = (cvId: string) => route + 'cvs/educations' + `/${cvId}/update`;
export const getUpdateLanguageInfoUrl = (cvId: string) => route + `cvs/languagesinfo/${cvId}/update`;
export const getUpdateCvSkillsUrl = (cvId: string) => route + `cvs/skills/${cvId}/update`;
export const getCvPersonalDetailsUpdateUrl = (cvId: string): string => route + `cvs/personalDetails/${cvId}/update`;
export const getCvWorkExperienceUrl = (id: string): string => route + 'cvs/WorkExperiences' + `/${id}`;
export const getUpdateWorkExperienceInfoUrl = (cvId: string) => route + 'cvs/WorkExperiences' + `/${cvId}/update`;
