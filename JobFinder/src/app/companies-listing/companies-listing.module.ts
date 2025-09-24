import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CompaniesListingRoutingModule } from './companies-listing-routing.module';
import { CompanyCardComponent, CompaniesListingComponent } from './components';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';

@NgModule({
  declarations: [
    CompaniesListingComponent,
    CompanyCardComponent,
    CompanyDetailsComponent,
  ],
  imports: [
    CompaniesListingRoutingModule,
    SharedModule
  ]
})
export class CompaniesListingModule { }
