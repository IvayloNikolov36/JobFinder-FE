import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdDetailsComponent, AnonymousProfilePreviewComponent, CompanyProfileComponent, CreateJobAdvertisementComponent, CvPreviewRequestsListingComponent, MyJobAdsComponent, UserCvPreviewComponent } from './components';

const routes: Routes = [
    { path: 'profile', component: CompanyProfileComponent },
    { path: 'profile/my-ads', component: MyJobAdsComponent },
    { path: 'profile/cv-requests', component: CvPreviewRequestsListingComponent },
    { path: 'ads/create', component: CreateJobAdvertisementComponent },
    { path: 'ad/:id', component: AdDetailsComponent },
    { path: 'my-ads/:id/cv/:cvId/preview', component: UserCvPreviewComponent },
    { path: 'view-requested-cv/:cvRequestId', component: UserCvPreviewComponent },
    { path: 'my-ads/:id/anonymous-profile/:profileId/preview', component: AnonymousProfilePreviewComponent },
    { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule { }
