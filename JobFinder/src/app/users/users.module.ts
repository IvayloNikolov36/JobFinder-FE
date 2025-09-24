import { NgModule } from '@angular/core';
import {
  AnonymousProfileAppearanceComponent,
  CoursesCertificatesComponent,
  CreateCvComponent,
  CvInfoComponent,
  CvRequestsListingComponent,
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
  JobAdvertisementDetailsComponent
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
    AnonymousProfileAppearanceComponent,
    CvRequestsListingComponent,
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
