import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvViewComponent } from './components/cv-view-edit/cv-view-edit.component';
import {
  CompanyDetailsComponent,
  CreateCvComponent,
  MyJobApplicationsComponent,
  MySubscriptionsComponent,
  UserAccountComponent,
  UserCurriculumVitaesComponent
} from './components';

const routes: Routes = [
  { path: 'create-cv', component: CreateCvComponent },
  { path: 'profile', component: UserAccountComponent },
  { path: 'profile/subscriptions', component: MySubscriptionsComponent },
  { path: 'profile/job-applications', component: MyJobApplicationsComponent },
  { path: 'my-cvs', component: UserCurriculumVitaesComponent },
  { path: 'my-cvs/cv-details/:id', component: CvViewComponent },
  { path: 'company-details/:id', component: CompanyDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
