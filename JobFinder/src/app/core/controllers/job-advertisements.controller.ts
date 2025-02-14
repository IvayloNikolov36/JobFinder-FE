import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;

export const getAds = (): string => route + 'jobads';
export const getAd = (id: number) => route + `jobads/${id}`;
export const createAd = (): string => route + 'jobads/create';
export const getEngagementsUrl = (): string => route + 'jobEngagements';
export const getCategoriesUrl = (): string => route + 'jobCategories';
