import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCvComponent } from './components/create-cv/create-cv.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserCurriculumVitaesComponent } from './components/user-curriculum-vitaes/user-curriculum-vitaes.component';
import { CvViewComponent } from './components/cv-view/cv-view.component';
import { MySubscriptionsComponent } from './components';

const routes: Routes = [
  { path: 'create-cv', component: CreateCvComponent },
  { path: 'profile', component: UserAccountComponent },
  { path: 'profile/subscriptions', component: MySubscriptionsComponent },
  { path: 'my-cvs', component: UserCurriculumVitaesComponent },
  { path: 'my-cvs/cv-details/:id', component: CvViewComponent },
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
