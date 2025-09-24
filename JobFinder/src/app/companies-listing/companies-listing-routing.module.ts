import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesListingComponent } from './components/companies-listing/companies-listing.component';

const routes: Routes = [
    { path: 'all', component: CompaniesListingComponent },
    { path: '', pathMatch: 'full', redirectTo: 'all' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesListingRoutingModule { }
