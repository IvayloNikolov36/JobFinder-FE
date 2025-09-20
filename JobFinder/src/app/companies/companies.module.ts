import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import {
  AdApplicationsPanelComponent,
  AdDetailsComponent,
  AdFormComponent,
  AdRelatedAnonymousProfilesPanelComponent,
  AdViewEditComponent,
  AnonymousProfilePreviewComponent,
  ApplicationCardComponent,
  CompanyProfileComponent,
  CreateJobAdvertisementComponent,
  CvPreviewRequestsListingComponent,
  JobAdCardComponent,
  MyJobAdsComponent,
  RelatedAnonymousProfilesListingComponent,
  UserCvPreviewComponent
} from './components';

@NgModule({
  declarations: [
    CreateJobAdvertisementComponent,
    MyJobAdsComponent,
    UserCvPreviewComponent,
    CompanyProfileComponent,
    AdDetailsComponent,
    RelatedAnonymousProfilesListingComponent,
    AnonymousProfilePreviewComponent,
    AdApplicationsPanelComponent,
    AdRelatedAnonymousProfilesPanelComponent,
    CvPreviewRequestsListingComponent,
    AdViewEditComponent,
    AdFormComponent,
    JobAdCardComponent,
    ApplicationCardComponent,
  ],
  imports: [
    SharedModule,
    CompaniesRoutingModule,
    CommonModule,
  ]
})
export class CompaniesModule { }
