import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyProfileService } from '../../services';
import { CompanyProfileData } from '../../models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services';
import { CloudImageModel } from '../../../core/models';

@Component({
  selector: 'jf-company-profile',
  templateUrl: './company-profile.component.html',
  standalone: false
})
export class CompanyProfileComponent implements OnInit {

  @ViewChild('fileInput', { read: ElementRef }) fileInput!: ElementRef<HTMLElement>;

  profileData$!: Observable<CompanyProfileData>;
  logoUrl: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private companyProfileService: CompanyProfileService
  ) { }

  ngOnInit(): void {
    this.profileData$ = this.companyProfileService.getProfileData();
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;
    const file: File | null = files === null ? null : files[0];

    if (file) {
      this.companyProfileService.changeCompanyLogo(file)
        .subscribe((data: CloudImageModel) => {
          this.logoUrl = data.thumbnailUrl;
        });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
