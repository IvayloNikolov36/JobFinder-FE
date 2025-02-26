import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobAdvertisementComponent, MyJobAdsComponent } from './components';

const routes: Routes = [
    { path: 'ads/create', component: CreateJobAdvertisementComponent },
    { path: 'my-job-ads', component: MyJobAdsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule { }
