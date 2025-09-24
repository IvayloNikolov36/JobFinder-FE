import { BasicModel } from "../../core/models";

export interface CompanyListing extends BasicModel<number> {
    logo: string;
    employees: number;
    ads: number;
    subscription: boolean;
}
