import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
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

  @ViewChild('fileInput', { read: ElementRef }) fileInput!: ElementRef<HTMLElement>;

  userProfileData$!: Observable<UserProfileData>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
    this.userProfileData$ = this.userProfileService.getMyProfileData();
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;
    const file: File | null = files === null ? null : files[0];

    if (file) {
      this.userProfileService.changeProfilePicture(file)
        .subscribe((data: any) => console.log(data));
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
