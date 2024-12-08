import { PersonalDetailsService } from './../../services/personal-details.service';
import { getCitizenshipsUrl } from './../../../core/controllers/nomenclature.controller';
import { SkillsService } from './../../services/skills.service';
import {
  Component,
  ComponentRef,
  InputSignal,
  OnInit,
  Signal,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CoursesService, CurriculumVitaesService, EducationsService, LanguagesInfoService, PersonalDetailsService as PersonalInfoService, WorkExperiencesService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { CvListingData } from '../../models/cv/cv-listing-data';
import {
  CourseCertificate,
  Education,
  EducationOutput,
  LanguageInfoInput,
  LanguageInfoOutput,
  PersonalDetails,
  PersonalDetailsOutput,
  SkillsInfo,
  SkillsInfoOutput,
  WorkExperience,
  WorkExperienceOutput
} from '../../models/cv';
import { EducationsComponent } from '../educations/educations.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Modal } from 'bootstrap';
import { LanguagesInfoComponent } from '../languages-info/languages-info.component';
import { CoursesCertificatesComponent } from '../courses-certificates/courses-certificates.component';
import { WorkExperiencesComponent } from '../work-experiences/work-experiences.component';
import { ToastrService } from 'ngx-toastr';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { SkillsInfoComponent } from '../skills-info/skills-info.component';
import { BasicModel } from '../../../models';
import { NomenclatureService } from '../../../core/services';

@Component({
  selector: 'jf-cv-view',
  templateUrl: './cv-view.component.html'
})
export class CvViewComponent implements OnInit {

  @ViewChild('editCvSectionComponent', { read: ViewContainerRef }) cvSectionComponentRef!: ViewContainerRef;

  cvId: string;
  fullName!: string;
  cv!: CvListingData;
  showModal: boolean = false;
  editCvSectionTitle: string = '';
  createdComponentRef!: ComponentRef<any>;

  educationLevels!: Signal<BasicModel[]>;
  languageTypes!: Signal<BasicModel[]>;
  languageLevels!: Signal<BasicModel[]>;
  bussinessSectors!: Signal<BasicModel[]>;
  countries!: Signal<BasicModel[]>;
  citizenships!: Signal<BasicModel[]>;
  genderOptions!: Signal<BasicModel[]>;
  drivingCategories!: Signal<BasicModel[]>;

  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private cvService: CurriculumVitaesService,
    private educationsService: EducationsService,
    private languagesService: LanguagesInfoService,
    private coursesService: CoursesService,
    private skillsInfoService: SkillsService,
    private workExperiencesService: WorkExperiencesService,
    private personalInfoService: PersonalInfoService,
    private nomenclatureService: NomenclatureService) {

    this.cvId = this.route.snapshot.params['id'];

    const initialValue: BasicModel[] = [] as BasicModel[];
    this.educationLevels = toSignal(this.nomenclatureService.getEducationLevels(), { initialValue });
    this.languageTypes = toSignal(this.nomenclatureService.getLanguageTypes(), { initialValue });
    this.languageLevels = toSignal(this.nomenclatureService.getLanguageLevels(), { initialValue });
    this.bussinessSectors = toSignal(this.nomenclatureService.getBusinessSectors(), { initialValue });
    this.countries = toSignal(this.nomenclatureService.getCountries(), { initialValue });
    this.citizenships = toSignal(this.nomenclatureService.getCitizenships(), { initialValue });
    this.genderOptions = toSignal(this.nomenclatureService.getGenderOptions(), { initialValue });
    this.drivingCategories = toSignal(this.nomenclatureService.getDrivingCategories(), { initialValue });
  }

  ngOnInit(): void {
    this.loadCvData();
  }

  onCloseEditSectionModal = (): void => {
    this.createdComponentRef.destroy();
  }

  editPersonalDetails = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Personal Details"
    modal.show();
    this.onCreatePersonalDetailsModalComponent();
  }

  editSkillsInfo = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Skills Info"
    modal.show();
    this.onCreateSkillsModalComponent();
  }

  editEducations = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Educations info"
    modal.show();
    this.onCreateEducationModalComponent();
  }

  editLanguagesInfo = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Languages info"
    modal.show();
    this.onCreateLanguagesInfoComponent();
  }

  editCoursesInfo = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Courses info"
    modal.show();
    this.onCreateCoursesInfoComponent();
  }

  editWorkExperienceInfo = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Work Experience info"
    modal.show();
    this.onCreateWorkExperienceInfoComponent();
  }

  private onCreateSkillsModalComponent = (): void => {
    const createdComponentRef: ComponentRef<SkillsInfoComponent> = this.cvSectionComponentRef
      .createComponent(SkillsInfoComponent);

    this.createdComponentRef = createdComponentRef;

    const component: SkillsInfoComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.drivingCategories = this.drivingCategories as InputSignal<BasicModel[]>;
    component.skillsInfoData = this.cv.skills;

    component.emitSkillsData
      .subscribe((data: SkillsInfo) => {
        const requestData: SkillsInfoOutput = this.skillsInfoService.mapSkillsData(data);
        this.skillsInfoService.update(this.cv.id, requestData).subscribe(() => {
          this.cv.skills = { ...data };
          const cvSkills: SkillsInfo = this.cv.skills;
          cvSkills.licenseCategoriesText = this.getDrivingLicensesText(cvSkills.drivingLicenseCategories);
          this.toaster.success("Skills info successfuly updated.");
        });
      });
  }

  private onCreateWorkExperienceInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<WorkExperiencesComponent> = this.cvSectionComponentRef
      .createComponent(WorkExperiencesComponent);

    this.createdComponentRef = createdComponentRef;

    const component: WorkExperiencesComponent = createdComponentRef.instance;
    component.businessSectors = this.bussinessSectors as InputSignal<BasicModel[]>;
    component.workExperienceInfoData = this.cv.workExperiences;
    component.isEditMode = true;

    component.emitWorkExperiencesData
      .subscribe((data: WorkExperience[]) => {
        const requestData: WorkExperienceOutput[] = this.workExperiencesService.mapWorkExperienceInfoData(data);
        this.workExperiencesService.update(this.cv.id, requestData).subscribe(() => {
          this.cv.workExperiences = data;
          this.toaster.success("Work Experience info successfuly updated.");
        });
      });
  }

  private onCreateCoursesInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<CoursesCertificatesComponent> = this.cvSectionComponentRef
      .createComponent(CoursesCertificatesComponent);

    this.createdComponentRef = createdComponentRef;

    const component: CoursesCertificatesComponent = createdComponentRef.instance;

    component.isEditMode = true;
    component.coursesInfoData = this.cv.courseCertificates;

    component.emitCoursesData
      .subscribe((data: CourseCertificate[]) => {
        this.coursesService.update(this.cv.id, data).subscribe(() => {
          this.cv.courseCertificates = data;
          this.toaster.success("Courses info successfuly updated.");
        });
      });
  }

  private onCreateLanguagesInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<LanguagesInfoComponent> = this.cvSectionComponentRef.createComponent(LanguagesInfoComponent);
    this.createdComponentRef = createdComponentRef;
    const component: LanguagesInfoComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.languagesInfoData = this.cv.languagesInfo;
    component.languageTypes = this.languageTypes as InputSignal<BasicModel[]>;
    component.languageLevels = this.languageLevels as InputSignal<BasicModel[]>;

    component.emitLanguagesInfo.subscribe((data: LanguageInfoInput[]) => {
      debugger;
      const requestData: LanguageInfoOutput[] = this.languagesService.mapLanguageInfoData(data);
      this.languagesService.update(requestData).subscribe(() => {
        // TODO: if new element is added it is with id 0 - find way to get the new id
        this.cv.languagesInfo = data;
        this.toaster.success("Languages info successfuly updated.");
      });
    });
  }

  private onCreateEducationModalComponent = (): void => {
    const createdComponentRef: ComponentRef<EducationsComponent> = this.cvSectionComponentRef
      .createComponent(EducationsComponent);
    this.createdComponentRef = createdComponentRef;
    const component: EducationsComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.educationsData = this.cv.educations;
    component.educationLevels = this.educationLevels as InputSignal<BasicModel[]>;

    component.emitEducationData
      .subscribe((data: Education[]) => {
        const requestData: EducationOutput[] = this.educationsService.mapEducationInfoData(data);
        this.educationsService.update(this.cv.id, requestData).subscribe(() => {
          this.cv.educations = data;
          this.toaster.success("Education info successfuly updated.");
        });
      });
  }

  private loadCvData = (): void => {
    this.cvService.getCvListingData(this.cvId)
      .subscribe((data: CvListingData) => {
        this.cv = data;
        const details: PersonalDetails = this.cv.personalDetails;
        this.fullName = `${details.firstName} ${details.middleName} ${details.lastName}`;
        const cvSkills: SkillsInfo = this.cv.skills;
        cvSkills.licenseCategoriesText = this.getDrivingLicensesText(cvSkills.drivingLicenseCategories);
      });
  }

  private getDrivingLicensesText = (drivingLicenseCategories: BasicModel[]): string => {
    return drivingLicenseCategories.length > 0
      ? drivingLicenseCategories.map(x => x.name).join(', ')
      : 'no driving license';
  }

  private onCreatePersonalDetailsModalComponent = (): void => {
    const createdComponentRef: ComponentRef<PersonalDetailsComponent> = this.cvSectionComponentRef
      .createComponent(PersonalDetailsComponent);
    this.createdComponentRef = createdComponentRef;
    const component: PersonalDetailsComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.personalDetailsData = this.cv.personalDetails;
    component.countries = this.countries as InputSignal<BasicModel[]>;
    component.citizenships = this.citizenships as InputSignal<BasicModel[]>;
    component.genderOptions = this.genderOptions as InputSignal<BasicModel[]>;

    component.emitPersonalDetails
      .subscribe((data: PersonalDetails) => {
        const requestData: PersonalDetailsOutput = this.personalInfoService.mapPersonalInfo(data);
        this.personalInfoService.update(requestData).subscribe(() => {
          this.cv.personalDetails = { ...data };
          this.toaster.success("Personal Details successfuly updated.");
        });
      });
  }
}
