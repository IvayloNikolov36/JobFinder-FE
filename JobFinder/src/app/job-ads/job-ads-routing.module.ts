import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobAdsListingComponent } from './components';

const routes: Routes = [
  { path: 'all', component: JobAdsListingComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobAdsRoutingModule { }
