import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdDetailsComponent, AnonymousProfilePreviewComponent, CompanyProfileComponent, CreateJobAdvertisementComponent, MyJobAdsComponent, UserCvPreviewComponent } from './components';

const routes: Routes = [
    { path: 'profile', component: CompanyProfileComponent },
    { path: 'ads/create', component: CreateJobAdvertisementComponent },
    { path: 'ad/:id', component: AdDetailsComponent },
    { path: 'my-ads', component: MyJobAdsComponent },
    { path: 'my-ads/:id/user-cv-preview/:cvId', component: UserCvPreviewComponent },
    { path: 'my-ads/:id/anonymous-profile-preview/:profileId', component: AnonymousProfilePreviewComponent },
    { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule { }
