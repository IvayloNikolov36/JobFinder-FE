import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyAnonymousProfilesService } from '../../services';
import { AnonymousProfileDataModel } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'jf-anonymous-profile-preview',
  templateUrl: './anonymous-profile-preview.component.html',
  standalone: false
})
export class AnonymousProfilePreviewComponent implements OnInit {

  jobAdId!: number;
  anonymousProfileId!: string;

  anonymousProfileData$!: Observable<AnonymousProfileDataModel>;

  constructor(
    private route: ActivatedRoute,
    private anonymousProfileService: CompanyAnonymousProfilesService) {
    this.jobAdId = this.route.snapshot.params['id'];
    this.anonymousProfileId = this.route.snapshot.params['profileId'];
  }

  ngOnInit(): void {
    this.loadAnonymousProfileData(this.anonymousProfileId, this.jobAdId);
  }

  private loadAnonymousProfileData = (id: string, jobAdId: number) => {
    this.anonymousProfileData$ = this.anonymousProfileService.preview(id, jobAdId);
  }
}
