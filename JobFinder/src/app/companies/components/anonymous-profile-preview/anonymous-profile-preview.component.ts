import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  jobAdId!: number;
  anonymousProfileId!: string;

  anonymousProfileData$!: Observable<CvPreviewData>;

  mode: typeof CvSectionModeEnum = CvSectionModeEnum;

  constructor(
    private route: ActivatedRoute,
    private anonymousProfileService: CompanyAnonymousProfilesService,
    private toastr: ToastrService) {
    this.jobAdId = this.route.snapshot.params['id'];
    this.anonymousProfileId = this.route.snapshot.params['profileId'];
  }

  ngOnInit(): void {
    this.loadAnonymousProfileData(this.anonymousProfileId, this.jobAdId);
  }

  requestCv = (): void => {
    this.anonymousProfileService
      .requestCv({
        anonymousProfileId: this.anonymousProfileId,
        jobAdId: this.jobAdId
      } satisfies CvPreviewRequestModel)
      .subscribe({
        next: () => this.toastr.success('Successfully requested Cv.')
        // TODO: hide the button for CV request
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
            x.coursesInfo
          );
        })
      );
  }
}
