import { Component, OnInit } from '@angular/core';
import { CompanyProfileService } from '../services';
import { CompanyProfileData } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'jf-company-profile',
  templateUrl: './company-profile.component.html',
  standalone: false
})
export class CompanyProfileComponent implements OnInit {

  profileData$!: Observable<CompanyProfileData>;
  
  constructor(private companyProfileService: CompanyProfileService) { }

  ngOnInit(): void {
    this.profileData$ = this.companyProfileService.getProfileData();
  }
}
