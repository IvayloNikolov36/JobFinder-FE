import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginUrl, registerCompanyUrl, registerUserUrl } from '../controllers';
import { LoginResultModel, RegisterUserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {
    const token: string | null = this.getToken();
    if (token && this.isTokenExpired(token)) {
      this.logout();
    }
  }

  registerUser(registerModel: RegisterUserModel): Observable<Object> {
    return this.http.post(registerUserUrl(), registerModel);
  }

  registerCompany(body: any): Observable<Object> {
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
    return this.getToken() !== null;
  }

  isAdmin = (): boolean => this.getRoles().includes("Admin");

  isCompany = (): boolean => this.getRoles().includes("Company");

  isJobSeeker = (): boolean => this.getRoles().includes("Job Seeker");

  getUserName(): string | null {
    return localStorage.getItem('username');
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }

  private getRoles = (): string[] => {
    const rolesData: string | null = localStorage.getItem('roles');

    if (rolesData) {
      const roles: string[] = JSON.parse(rolesData);
      return roles;
    }

    return [];
  }

  private isTokenExpired(token: string): boolean {
    const jwtToken: any = JSON.parse(atob(token.split('.')[1]));
    const expireDate: Date = new Date(jwtToken.exp * 1000);
    const timeout: number = expireDate.getTime() - Date.now();

    return timeout <= 0;
  }
}
