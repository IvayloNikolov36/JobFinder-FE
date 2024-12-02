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
import { CoursesService, CurriculumVitaesService, EducationsService, LanguagesInfoService, PersonalDetailsService, WorkExperiencesService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { CvListingData } from '../../models/cv/cv-listing-data';
import {
  CourseCertificate,
  Education,
  LanguageInfoInput,
  LanguageInfoOutput,
  PersonalDetails,
  PersonalDetailsOutput,
  SkillsInfo,
  WorkExperience,
  WorkExperienceOutput
} from '../../models/cv';
import { EducationsComponent } from '../educations/educations.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasicValueModel } from '../../../core/models';
import { Modal } from 'bootstrap';
import { LanguagesInfoComponent } from '../languages-info/languages-info.component';
import { CoursesCertificatesComponent } from '../courses-certificates/courses-certificates.component';
import { WorkExperiencesComponent } from '../work-experiences/work-experiences.component';
import { ToastrService } from 'ngx-toastr';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { SkillsInfoComponent } from '../skills-info/skills-info.component';

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

  educationLevels!: Signal<BasicValueModel[]>;
  languageTypes!: Signal<BasicValueModel[]>;
  languageLevels!: Signal<BasicValueModel[]>;
  bussinessSectors!: Signal<BasicValueModel[]>;
  countries!: Signal<BasicValueModel[]>;

  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private cvService: CurriculumVitaesService,
    private educationsService: EducationsService,
    private languagesService: LanguagesInfoService,
    private coursesService: CoursesService,
    private skillsServie: SkillsService,
    private workExperiencesService: WorkExperiencesService,
    private pDetailsService: PersonalDetailsService) {

    this.cvId = this.route.snapshot.params['id'];

    this.educationLevels = toSignal(this.educationsService.getEducationLevels(), { initialValue: [] as BasicValueModel[] });
    this.languageTypes = toSignal(this.languagesService.getLanguageTypes(), { initialValue: [] as BasicValueModel[] });
    this.languageLevels = toSignal(this.languagesService.getLanguageLevels(), { initialValue: [] as BasicValueModel[] });
    this.bussinessSectors = toSignal(this.workExperiencesService.getBusinessSectors(), { initialValue: [] as BasicValueModel[] });
    this.countries = toSignal(this.pDetailsService.getCountries(), { initialValue: [] as BasicValueModel[] });
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

    component.emitSkillsData
      .subscribe((data: SkillsInfo) => {
        const requestData: SkillsInfo = {} as SkillsInfo;
        this.skillsServie.update(this.cv.id, requestData).subscribe(() => {
          this.cv.skills = data;
          this.toaster.success("Skills info successfuly updated.");
        });
      });
  }

  private onCreateWorkExperienceInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<WorkExperiencesComponent> = this.cvSectionComponentRef
      .createComponent(WorkExperiencesComponent);

    this.createdComponentRef = createdComponentRef;

    const component: WorkExperiencesComponent = createdComponentRef.instance;
    component.businessSectors = this.bussinessSectors as InputSignal<BasicValueModel[]>;
    component.workExperienceInfoData = this.cv.workExperiences;
    component.isEditMode = true;

    component.emitWorkExperiencesData
      .subscribe((data: WorkExperience[]) => {
        const requestData: WorkExperienceOutput[] = data.map((element: WorkExperience) => {
          return { ...element, businessSector: element.businessSector.value }
        });
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
    component.languageTypes = this.languageTypes as InputSignal<BasicValueModel[]>;
    component.languageLevels = this.languageLevels as InputSignal<BasicValueModel[]>;

    component.emitLanguagesInfo.subscribe((data: LanguageInfoInput[]) => {
      const requestData: LanguageInfoOutput[] = this.mapLanguageInfoData(data);
      this.languagesService.update(this.cv.id, requestData).subscribe(() => {
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
    component.educationLevels = this.educationLevels as InputSignal<BasicValueModel[]>;

    component.emitEducationData
      .subscribe((data: Education[]) => {
        this.educationsService.update(this.cv.id, data).subscribe(() => {
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
      });
  }

  private mapLanguageInfoData = (data: LanguageInfoInput[]): LanguageInfoOutput[] => {
    return data.map((element: LanguageInfoInput) => {
      const result: LanguageInfoOutput = {} as LanguageInfoOutput;
      result.id = element.id;
      result.cvId = element.cvId;
      result.comprehension = element.comprehension.value;
      result.writing = element.writing.value;
      result.speaking = element.speaking.value;
      result.languageType = element.languageType.value;
      return result;
    });
  }

  private onCreatePersonalDetailsModalComponent = (): void => {
    const createdComponentRef: ComponentRef<PersonalDetailsComponent> = this.cvSectionComponentRef
      .createComponent(PersonalDetailsComponent);
    this.createdComponentRef = createdComponentRef;
    const component: PersonalDetailsComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.personalDetailsData = this.cv.personalDetails;
    component.countries = this.countries as InputSignal<BasicValueModel[]>;

    component.emitPersonalDetails
      .subscribe((data: PersonalDetails) => {
        const requestData: PersonalDetailsOutput = {
          ...data,
          gender: data.gender.value,
          country: data.country.value,
          citizenShip: data.citizenShip.value
        };

        this.pDetailsService.update(this.cv.id, requestData).subscribe(() => {
          this.cv.personalDetails = data;
          this.toaster.success("Personal Details successfuly updated.");
        });
      });
  }
}