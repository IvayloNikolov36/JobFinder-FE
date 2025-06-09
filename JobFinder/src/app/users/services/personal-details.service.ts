import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalInfo } from '../../shared/models/personal-details';
import { getCvPersonalInfoUpdateUrl } from '../../core/controllers';
import { PersonalInfoOutput } from '../models/cv';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: PersonalInfoOutput): Observable<Object> {
    return this.http.put(getCvPersonalInfoUpdateUrl(cvId), data);
  }

  mapPersonalInfo = (data: PersonalInfo): PersonalInfoOutput => {
    return {
      id: data.id,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      genderId: data.gender.id,
      birthdate: data.birthdate,
      citizenshipId: data.citizenship.id,
      countryId: data.country.id,
      city: data.city
    } as PersonalInfoOutput;
  }
}
