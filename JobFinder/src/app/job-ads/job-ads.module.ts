import { NgModule } from '@angular/core';
import { AdsFiltersComponent, JobAdsListingComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { JobAdsRoutingModule } from './job-ads-routing.module';

@NgModule({
  declarations: [
    JobAdsListingComponent,
    AdsFiltersComponent
  ],
  imports: [
    SharedModule,
    JobAdsRoutingModule,
  ]
})
export class JobAdsModule { }
