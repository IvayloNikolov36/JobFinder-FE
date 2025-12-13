import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;

export const getCvPersonalInfoUpdateUrl = (cvId: string): string => route + `personal-info/${cvId}`;
export const getUpdateWorkExperienceInfoUrl = (cvId: string) => route + `work-experience/${cvId}`;
export const getCvEducationsEditUrl = (cvId: string) => route + `education-info/${cvId}`;
export const getUpdateLanguageInfoUrl = (cvId: string) => route + `languages-info/${cvId}/update`;
export const getUpdateCvSkillsUrl = (cvId: string) => route + `skills-info/${cvId}`;
export const getUpdateCvCourseUrl = (cvId: string) => route + `courses-info/${cvId}`;

export const getAllMine = (): string => route + 'cvs/all';
export const getOwnCvData = (cvId: string) => route + `cvs/${cvId}`;
export const getUserCvData = (cvId: string, jobAdId: number) => route + `cvs/${cvId}/${jobAdId}`;
export const getRequestedCvData = (cvRequestId: number) => route + `cvs/preview/${cvRequestId}`;
export const getCreateCvUrl = () => route + `cvs`;
export const getDeleteCvUrl = (id: string) => route + `cvs/${id}`;