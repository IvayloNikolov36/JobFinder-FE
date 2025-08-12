import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, CompanyGuard, IsNotSignedInGuard } from './core/guards';
import { HomeComponent, LoginComponent, RegisterCompanyComponent, RegisterUserComponent } from './core/components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent, canActivate: [IsNotSignedInGuard] },
  { path: 'register-company', component: RegisterCompanyComponent, canActivate: [IsNotSignedInGuard] },
  { path: 'register-user', component: RegisterUserComponent, canActivate: [IsNotSignedInGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'ads', loadChildren: () => import('./job-ads/job-ads.module').then(m => m.JobAdsModule), canActivate: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: 'companies', loadChildren: () => import('./companies/companies.module').then(c => c.CompaniesModule), canActivate: [CompanyGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
