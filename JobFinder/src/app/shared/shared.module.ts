import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CollapseDirective, DropdownDirective } from './directives';
import {
  CoursesDetailsComponent,
  EditButtonComponent,
  EducationDetailsComponent,
  JobAdComponent,
  LanguagesDetailsComponent,
  NavbarComponent,
  PaginationComponent,
  PersonalInfoDetailsComponent,
  SkillsDetailsComponent,
  WorkExperienceDetailsComponent
} from './components';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginationComponent,
    DropdownDirective,
    CollapseDirective,
    WorkExperienceDetailsComponent,
    EducationDetailsComponent,
    LanguagesDetailsComponent,
    SkillsDetailsComponent,
    CoursesDetailsComponent,
    PersonalInfoDetailsComponent,
    EditButtonComponent,
    JobAdComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  exports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    PaginationComponent,
    DropdownDirective,
    CollapseDirective,
    NavbarComponent,
    WorkExperienceDetailsComponent,
    EducationDetailsComponent,
    LanguagesDetailsComponent,
    SkillsDetailsComponent,
    CoursesDetailsComponent,
    PersonalInfoDetailsComponent,
    EditButtonComponent,
    JobAdComponent
  ]
})
export class SharedModule { }
