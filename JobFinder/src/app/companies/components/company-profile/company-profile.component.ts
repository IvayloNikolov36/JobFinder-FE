import { Component, OnInit } from '@angular/core';
import { CompanyProfileService } from '../../services';
import { CompanyProfileData } from '../../models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'jf-company-profile',
  templateUrl: './company-profile.component.html',
  standalone: false
})
export class CompanyProfileComponent implements OnInit {

  profileData$!: Observable<CompanyProfileData>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private companyProfileService: CompanyProfileService
  ) { }

  ngOnInit(): void {
    this.profileData$ = this.companyProfileService.getProfileData();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
