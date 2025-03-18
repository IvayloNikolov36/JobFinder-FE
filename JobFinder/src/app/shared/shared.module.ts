import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { CollapseDirective } from './directives/collapse.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CoursesDetailsComponent,
  EditButtonComponent,
  EducationDetailsComponent,
  LanguagesDetailsComponent,  
  PersonalInfoDetailsComponent,
  SkillsDetailsComponent,
  WorkExperienceDetailsComponent
} from './components';
import { CustomMaterialModule } from '../custom-material/custom-material.module';

@NgModule({
  declarations: [
    NavbarComponent,
    DropdownDirective,
    CollapseDirective,
    WorkExperienceDetailsComponent,
    EducationDetailsComponent,
    LanguagesDetailsComponent,
    SkillsDetailsComponent,
    CoursesDetailsComponent,
    PersonalInfoDetailsComponent,
    EditButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
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
    FormsModule,
    NavbarComponent,
    DropdownDirective,
    CollapseDirective,
    WorkExperienceDetailsComponent,
    EducationDetailsComponent,
    LanguagesDetailsComponent,
    SkillsDetailsComponent,
    CoursesDetailsComponent,
    PersonalInfoDetailsComponent,
    EditButtonComponent,
  ]
})
export class SharedModule { }
