import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CreateJobAdvertisementComponent } from './create-job-advertisement/create-job-advertisement.component';
import { AuthGuard, CompanyGuard, IsSignedInGuard } from './core/guards';
import { JobAdvertisementsComponent } from './job-advertisements/job-advertisements.component';
import { JobAdvertisementDetailsComponent } from './job-advertisement-details/job-advertisement-details.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent, canActivate: [IsSignedInGuard] },
  { path: 'register-company', component: RegisterCompanyComponent, canActivate: [IsSignedInGuard] },
  { path: 'register-user', component: RegisterUserComponent, canActivate: [IsSignedInGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'job-advertisement/create', component: CreateJobAdvertisementComponent, canActivate: [CompanyGuard] },
  { path: 'jobs-all', component: JobAdvertisementsComponent, canActivate: [AuthGuard] },
  { path: 'job-details/:id', component: JobAdvertisementDetailsComponent },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
