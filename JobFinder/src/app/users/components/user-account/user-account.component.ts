import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services';
import { UserProfileData } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-user-account',
  templateUrl: './user-account.component.html',
  standalone: false
})
export class UserAccountComponent implements OnInit {

  userProfileData$!: Observable<UserProfileData>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
    this.userProfileData$ = this.userProfileService.getMyProfileData();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
