import { Component, Input, OnInit } from '@angular/core';
import { CompanyAnonymousProfilesService } from '../../services';
import { AnonymousProfileDataModel, CvPreviewData, CvPreviewRequestModel } from '../../models';
import { map, Observable } from 'rxjs';
import { CvSectionModeEnum } from '../../../shared/enums';
import { EducationInfo, PersonalInfo, WorkExperienceInfo } from '../../../shared/models';
import { ToastrService } from 'ngx-toastr';

const OrganizationName: string = 'Blurred Organization';
const PictureUrl: string = 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

@Component({
  selector: 'jf-anonymous-profile-preview',
  templateUrl: './anonymous-profile-preview.component.html',
  standalone: false
})
export class AnonymousProfilePreviewComponent implements OnInit {

  @Input() id!: number;
  @Input() profileId!: string;

  anonymousProfileData$!: Observable<CvPreviewData>;

  mode: typeof CvSectionModeEnum = CvSectionModeEnum;
  disableRequestCvButton: boolean = false;

  constructor(
    private anonymousProfileService: CompanyAnonymousProfilesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.id && this.profileId) {
      this.loadAnonymousProfileData(this.profileId, this.id);
    }
  }

  requestCv = (): void => {
    this.anonymousProfileService
      .requestCv({
        anonymousProfileId: this.profileId,
        jobAdId: this.id
      } satisfies CvPreviewRequestModel)
      .subscribe({
        next: () => {
          this.toastr.success('Successfully requested Cv.')
          this.disableRequestCvButton = true;
        }
      });
  }

  private loadAnonymousProfileData = (id: string, jobAdId: number) => {
    this.anonymousProfileData$ = this.anonymousProfileService
      .preview(id, jobAdId)
      .pipe(
        map((x: AnonymousProfileDataModel) => {
          return new CvPreviewData(
            PictureUrl,
            x.personalInfo as PersonalInfo,
            x.educationInfo.map(ei => {
              return { ...ei, includeInAnonymousProfile: true, id: 0 } satisfies EducationInfo
            }),
            x.workExperienceInfo.map(we => {
              return { ...we, includeInAnonymousProfile: true, id: 0, organization: OrganizationName } satisfies WorkExperienceInfo
            }),
            x.languagesInfo,
            x.skillsInfo,
            x.coursesInfo,
            x.isCvRequested
          );
        })
      );
  }
}
