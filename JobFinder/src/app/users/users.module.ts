import { NgModule } from '@angular/core';
import {
  AnonymousProfileAppearanceComponent,
  CoursesCertificatesComponent,
  CreateCvComponent,
  CvInfoComponent,
  CvViewComponent,
  EducationsComponent,
  CreateJobsSubscriptionsComponent,
  JobSubscriptionsListingComponent,
  LanguagesInfoComponent,
  MySubscriptionsComponent,
  PersonalInfoComponent,
  SkillsInfoComponent,
  UserAccountComponent,
  UserCurriculumVitaesComponent,
  WorkExperienceInfoComponent,
  MyJobApplicationsComponent,
  JobAdvertisementDetailsComponent,
  CompanyDetailsComponent
} from './components/';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateCvComponent,
    UserAccountComponent,
    UserCurriculumVitaesComponent,
    CvInfoComponent,
    PersonalInfoComponent,
    WorkExperienceInfoComponent,
    EducationsComponent,
    LanguagesInfoComponent,
    SkillsInfoComponent,
    CoursesCertificatesComponent,
    CvViewComponent,
    MySubscriptionsComponent,
    MyJobApplicationsComponent,
    CreateJobsSubscriptionsComponent,
    JobSubscriptionsListingComponent,
    JobAdvertisementDetailsComponent,
    CompanyDetailsComponent,
    AnonymousProfileAppearanceComponent,
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
