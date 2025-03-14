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
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatBadgeModule,
    MatExpansionModule,
  ]
})
export class UsersModule { }
