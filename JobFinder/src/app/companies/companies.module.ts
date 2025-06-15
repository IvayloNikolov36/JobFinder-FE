import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import {
  AdApplicationsListingComponent,
  AdDetailsComponent,
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
  ],
  imports: [
    SharedModule,
    CompaniesRoutingModule,
    CommonModule,
  ]
})
export class CompaniesModule { }
