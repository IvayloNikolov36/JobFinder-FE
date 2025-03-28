import { LanguagesInfoService } from './../../services/languages-info.service';
import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, Signal } from '@angular/core';
import { CvInfoComponent } from '../cv-info/cv-info.component';
import { FormGroup } from '@angular/forms';
import { CoursesCertificatesComponent, EducationsComponent, LanguagesInfoComponent, PersonalDetailsComponent, SkillsInfoComponent, WorkExperienceInfoComponent } from '../index';
import { CvCreate, CvInfo } from '../../models/cv';
import { CurriculumVitaesService, EducationsService, PersonalDetailsService, SkillsService, WorkExperiencesService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasicModel } from '../../../core/models';
import { NomenclatureService } from '../../../core/services';
import { Router } from '@angular/router';
import { CourseCertificateInfo, EducationInfo, LanguageInfo, PersonalDetails, SkillsInfo, WorkExperienceInfo } from '../../../shared/models';

@Component({
  selector: 'jf-create-cv',
  templateUrl: './create-cv.component.html',
  standalone: false
})
export class CreateCvComponent implements AfterViewInit {

  @ViewChild(CvInfoComponent) cvInfoComponent!: CvInfoComponent;
  @ViewChild(PersonalDetailsComponent) personalDetailsComponent!: PersonalDetailsComponent;
  @ViewChild(WorkExperienceInfoComponent) workExperiencesComponent!: WorkExperienceInfoComponent;
  @ViewChild(EducationsComponent) educationsComponent!: EducationsComponent;
  @ViewChild(LanguagesInfoComponent) languagesInfoComponent!: LanguagesInfoComponent;
  @ViewChild(SkillsInfoComponent) skillsInfoComponent!: SkillsInfoComponent;
  @ViewChild(CoursesCertificatesComponent) coursesCertificatesComponent!: CoursesCertificatesComponent;

  cvInfoForm!: FormGroup<any>;
  personalDetailsForm!: FormGroup<any>;
  workExperiencesForm!: FormGroup<any>;
  educationsForm!: FormGroup<any>;
  languagesInfoForm!: FormGroup<any>;
  skillsInfoForm!: FormGroup<any>;
  coursesCertificatesForm!: FormGroup<any>;

  countries!: Signal<BasicModel[]>;
  citizenships!: Signal<BasicModel[]>;
  genderOptions!: Signal<BasicModel[]>;
  businessSectors!: Signal<BasicModel[]>;
  educationLevels!: Signal<BasicModel[]>;
  languageTypes!: Signal<BasicModel[]>;
  languageLevels!: Signal<BasicModel[]>;
  drivingCategories!: Signal<BasicModel[]>;

  cvModel: CvCreate = {} as CvCreate;

  constructor(
    private router: Router,
    private cdref: ChangeDetectorRef,
    private cvService: CurriculumVitaesService,
    private nomenclatureService: NomenclatureService,
    private personalDetailsService: PersonalDetailsService,
    private workExperiencesService: WorkExperiencesService,
    private educationsService: EducationsService,
    private languagesService: LanguagesInfoService,
    private skillsInfoService: SkillsService,
    private toastr: ToastrService
  ) {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.cvInfoForm = this.cvInfoComponent.cvInfoForm;
    this.personalDetailsForm = this.personalDetailsComponent.personalInfoForm;
    this.workExperiencesForm = this.workExperiencesComponent.workExpForm;
    this.educationsForm = this.educationsComponent.educationsForm;
    this.languagesInfoForm = this.languagesInfoComponent.languagesForm;
    this.skillsInfoForm = this.skillsInfoComponent.skillsForm;
    this.coursesCertificatesForm = this.coursesCertificatesComponent.coursesForm;
    this.cdref.detectChanges();
  }

  onPassedCvInfoData = (info: CvInfo): void => {
    this.cvModel.name = info.name;
    this.cvModel.pictureUrl = info.pictureUrl;
  };

  onPassedPersonalDetailsData = (data: PersonalDetails): void => {
    this.cvModel.personalDetails = this.personalDetailsService.mapPersonalInfo(data);
  }

  onPassedWorkExperiencesData = (data: WorkExperienceInfo[]): void => {
    this.cvModel.workExperiences = this.workExperiencesService.mapWorkExperienceInfoData(data);
  }

  onPassedEducationData = (data: EducationInfo[]): void => {
    this.cvModel.educations = this.educationsService.mapEducationInfoData(data);
  }

  onPassedLanguagesInfo = (data: LanguageInfo[]): void => {
    this.cvModel.languagesInfo = this.languagesService.mapLanguageInfoData(data);
  }

  onPassedSkillsInfoData = (data: SkillsInfo): void => {
    this.cvModel.skills = this.skillsInfoService.mapSkillsData(data);
  }

  onPassedCoursesData = (data: CourseCertificateInfo[]): void => {
    this.cvModel.courseCertificates = data;
  }

  sendCVdata = (): void => {
    this.cvService.create(this.cvModel)
      .subscribe({
        next: () => {
          this.toastr.success(`${this.cvModel.name} cv is successfully created.`);
          this.router.navigate(['/profile/cvs']);
        },
        error: (err) => this.toastr.error(err.error.errors[0].join(''))
      });
  }

  private getData = (): void => {
    this.countries = toSignal(this.nomenclatureService.getCountries(), { initialValue: [] });
    this.citizenships = toSignal(this.nomenclatureService.getCitizenships(), { initialValue: [] });
    this.genderOptions = toSignal(this.nomenclatureService.getGenderOptions(), { initialValue: [] });
    this.businessSectors = toSignal(this.nomenclatureService.getBusinessSectors(), { initialValue: [] });
    this.educationLevels = toSignal(this.nomenclatureService.getEducationLevels(), { initialValue: [] });
    this.languageTypes = toSignal(this.nomenclatureService.getLanguageTypes(), { initialValue: [] });
    this.languageLevels = toSignal(this.nomenclatureService.getLanguageLevels(), { initialValue: [] });
    this.drivingCategories = toSignal(this.nomenclatureService.getDrivingCategories(), { initialValue: [] });
  }
}
