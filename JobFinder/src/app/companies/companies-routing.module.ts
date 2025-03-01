import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobAdvertisementComponent, MyJobAdsComponent, UserCvPreviewComponent } from './components';

const routes: Routes = [
    { path: 'ads/create', component: CreateJobAdvertisementComponent },
    { path: 'my-ads', component: MyJobAdsComponent },
    { path: 'my-ads/user-cv-preview/:id', component: UserCvPreviewComponent },
    { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule { }
