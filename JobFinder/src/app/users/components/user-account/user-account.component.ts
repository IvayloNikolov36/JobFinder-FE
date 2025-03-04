import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services';
import { UserProfileData } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'jf-user-account',
  templateUrl: './user-account.component.html',
  standalone: false
})
export class UserAccountComponent implements OnInit {

  userProfileData$!: Observable<UserProfileData>;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileData$ = this.userProfileService.getMyProfileData(); 
  }
  
}
