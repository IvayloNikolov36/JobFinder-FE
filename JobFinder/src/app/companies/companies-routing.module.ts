import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileComponent, CreateJobAdvertisementComponent, MyJobAdsComponent, UserCvPreviewComponent } from './components';

const routes: Routes = [
    { path: 'profile', component: CompanyProfileComponent },
    { path: 'ads/create', component: CreateJobAdvertisementComponent },
    { path: 'my-ads', component: MyJobAdsComponent },
    { path: 'my-ads/:id/user-cv-preview/:cvId', component: UserCvPreviewComponent },
    { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule { }
