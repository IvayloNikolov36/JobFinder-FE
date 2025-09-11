import { BasicModel } from "../../core/models";

export interface PersonalInfo {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: BasicModel<number>;
  birthdate: string;
  citizenship: BasicModel<number>;
  country: BasicModel<number>;
  city: string;
}
