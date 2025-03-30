import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginUrl, registerCompanyUrl, registerUserUrl } from '../controllers';
import { LoginResultModel, RegisterUserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {  }

  registerUser(registerModel: RegisterUserModel): Observable<Object> {
    return this.http.post(registerUserUrl(), registerModel);
  }

  registerComapny(body: any): Observable<Object> {
    return this.http.post(registerCompanyUrl(), body);
  }

  login(body: any): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>(loginUrl(), body);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn.next(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isCompany(): boolean {
    return localStorage.getItem('isCompany') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getUserName(): string | null {
    return localStorage.getItem('username');
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}
