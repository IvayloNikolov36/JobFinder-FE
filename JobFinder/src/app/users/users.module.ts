import { NgModule } from '@angular/core';
import {
  CoursesCertificatesComponent,
  CreateCvComponent,
  CvInfoComponent,
  CvViewComponent,
  EducationsComponent,
  CreateJobsSubscriptionsComponent,
  JobSubscriptionsListingComponent,
  LanguagesInfoComponent,
  MySubscriptionsComponent,
  PersonalDetailsComponent,
  SkillsInfoComponent,
  UserAccountComponent,
  UserCurriculumVitaesComponent,
  WorkExperienceInfoComponent,
  MyJobApplicationsComponent
} from './components/';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateCvComponent,
    UserAccountComponent,
    UserCurriculumVitaesComponent,
    CvInfoComponent,
    PersonalDetailsComponent,
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
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
