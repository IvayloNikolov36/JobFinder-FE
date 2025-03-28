import { NgModule } from '@angular/core';
import { AdsFiltersComponent, JobAdComponent, JobAdsListingComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { JobAdsRoutingModule } from './job-ads-routing.module';

@NgModule({
  declarations: [
    JobAdsListingComponent,
    JobAdComponent,
    AdsFiltersComponent
  ],
  imports: [
    SharedModule,
    JobAdsRoutingModule,
  ]
})
export class JobAdsModule { }
