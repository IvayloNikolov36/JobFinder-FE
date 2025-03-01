import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalDetails } from '../../shared/models/personal-details';
import { getCvPersonalDetailsUpdateUrl } from '../../core/controllers';
import { PersonalDetailsOutput } from '../models/cv';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: PersonalDetailsOutput): Observable<Object> {
    return this.http.put(getCvPersonalDetailsUpdateUrl(cvId), data);
  }

  mapPersonalInfo = (data: PersonalDetails): PersonalDetailsOutput => {
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
    } as PersonalDetailsOutput;
  }
}
