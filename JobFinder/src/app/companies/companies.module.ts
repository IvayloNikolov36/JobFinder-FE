import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import {
  AdApplicationsListingComponent,
  AdApplicationsPanelComponent,
  AdDetailsComponent,
  AdRelatedAnonymousProfilesPanelComponent,
  AnonymousProfilePreviewComponent,
  CompanyProfileComponent,
  CreateJobAdvertisementComponent,
  MyJobAdsComponent,
  RelatedAnonymousProfilesListingComponent,
  UserCvPreviewComponent
} from './components';

@NgModule({
  declarations: [
    CreateJobAdvertisementComponent,
    MyJobAdsComponent,
    AdApplicationsListingComponent,
    UserCvPreviewComponent,
    CompanyProfileComponent,
    AdDetailsComponent,
    RelatedAnonymousProfilesListingComponent,
    AnonymousProfilePreviewComponent,
    AdApplicationsPanelComponent,
    AdRelatedAnonymousProfilesPanelComponent,
  ],
  imports: [
    SharedModule,
    CompaniesRoutingModule,
    CommonModule,
  ]
})
export class CompaniesModule { }
