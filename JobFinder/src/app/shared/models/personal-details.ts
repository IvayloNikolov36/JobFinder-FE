import { BasicModel } from "../../core/models";

export interface PersonalDetails {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: BasicModel;
  birthdate: string;
  citizenship: BasicModel;
  country: BasicModel;
  city: string;
}
