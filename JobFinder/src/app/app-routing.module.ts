import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AuthGuard, CompanyGuard, IsNotSignedInGuard } from './core/guards';
import { JobAdvertisementsComponent } from './components/job-advertisements/job-advertisements.component';
import { JobAdvertisementDetailsComponent } from './components/job-advertisement-details/job-advertisement-details.component';
import { CompanyDetailsComponent } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent, canActivate: [IsNotSignedInGuard] },
  { path: 'register-company', component: RegisterCompanyComponent, canActivate: [IsNotSignedInGuard] },
  { path: 'register-user', component: RegisterUserComponent, canActivate: [IsNotSignedInGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'jobs-all', component: JobAdvertisementsComponent },
  { path: 'job-details/:id', component: JobAdvertisementDetailsComponent },
  { path: 'company/:id', component: CompanyDetailsComponent },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: 'companies', loadChildren: () => import('./companies/companies.module').then(c => c.CompaniesModule), canActivate: [CompanyGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
