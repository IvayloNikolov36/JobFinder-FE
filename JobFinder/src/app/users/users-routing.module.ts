import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvViewComponent } from './components/cv-view-edit/cv-view-edit.component';
import {
  CompanyDetailsComponent,
  CreateCvComponent,
  JobAdvertisementDetailsComponent,
  MyJobApplicationsComponent,
  MySubscriptionsComponent,
  UserAccountComponent,
  UserCurriculumVitaesComponent
} from './components';

const routes: Routes = [
  { path: 'profile', component: UserAccountComponent },
  { path: 'profile/cvs', component: UserCurriculumVitaesComponent },
  { path: 'profile/cvs/new', component: CreateCvComponent },
  { path: 'profile/subscriptions', component: MySubscriptionsComponent },
  { path: 'profile/job-applications', component: MyJobApplicationsComponent },
  { path: 'profile/cvs/view/:id', component: CvViewComponent },
  { path: 'company/:id', component: CompanyDetailsComponent },
  { path: 'job-ad/:id', component: JobAdvertisementDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
