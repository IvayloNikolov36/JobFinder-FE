import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CreateJobAdvertisementComponent, MyJobAdsComponent } from './components';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdApplicationsListingComponent } from './components/ad-applications-listing/ad-applications-listing.component';

@NgModule({
  declarations: [
    CreateJobAdvertisementComponent,
    MyJobAdsComponent,
    AdApplicationsListingComponent,
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
