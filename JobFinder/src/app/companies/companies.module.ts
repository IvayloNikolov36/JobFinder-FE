import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import {
  AdApplicationsListingComponent,
  CreateJobAdvertisementComponent,
  MyJobAdsComponent,
  UserCvPreviewComponent
} from './components';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    CreateJobAdvertisementComponent,
    MyJobAdsComponent,
    AdApplicationsListingComponent,
    UserCvPreviewComponent,
  ],
  imports: [
    SharedModule,
    CompaniesRoutingModule,
    CommonModule,
    MatCardModule,
    MatExpansionModule,
  ]
})
export class CompaniesModule { }
