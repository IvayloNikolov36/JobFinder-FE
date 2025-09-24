import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesListingComponent } from './components/companies-listing/companies-listing.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';

const routes: Routes = [
    { path: 'all', component: CompaniesListingComponent },
    { path: ':id', component: CompanyDetailsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'all' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesListingRoutingModule { }
