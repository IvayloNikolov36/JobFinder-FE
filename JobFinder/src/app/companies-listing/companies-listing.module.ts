import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CompaniesListingRoutingModule } from './companies-listing-routing.module';
import { CompanyCardComponent, CompaniesListingComponent } from './components';

@NgModule({
  declarations: [
    CompaniesListingComponent,
    CompanyCardComponent
  ],
  imports: [
    CompaniesListingRoutingModule,
    SharedModule
  ]
})
export class CompaniesListingModule { }
