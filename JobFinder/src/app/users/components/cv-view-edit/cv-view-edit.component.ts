import { SkillsService } from '../../services/skills.service';
import { Component, ComponentRef, inject, Input, InputSignal, OnInit, signal, Signal, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import {
  AnonymousProfileService,
  CoursesService,
  CurriculumVitaesService,
  EducationsService,
  LanguagesInfoService,
  PersonalInfoService,
  WorkExperiencesService
} from '../../services';
import { Router } from '@angular/router';
import { CvListingData } from '../../models/cv/cv-listing-data';
import {
  EducationOutput,
  LanguageInfoOutput,
  PersonalInfoOutput,
  SkillsInfoOutput,
  WorkExperienceOutput
} from '../../models/cv';
import { EducationsComponent } from '../educations/educations.component';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Modal } from 'bootstrap';
import { LanguagesInfoComponent } from '../languages-info/languages-info.component';
import { CoursesCertificatesComponent } from '../courses-certificates/courses-certificates.component';
import { WorkExperienceInfoComponent } from '../work-experiences/work-experience-info.component';
import { ToastrService } from 'ngx-toastr';
import { PersonalInfoComponent } from '../personal-details/personal-details.component';
import { SkillsInfoComponent } from '../skills-info/skills-info.component';
import { BasicModel, IdentityResult, UpdateResult } from '../../../core/models';
import { NomenclatureService } from '../../../core/services';
import { CvSectionTypeEnum } from '../../enums/cv-section-type.enum';
import {
  CourseCertificateInfo,
  EducationInfo,
  LanguageInfo,
  PersonalInfo,
  SkillsInfo,
  WorkExperienceInfo
} from '../../../shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { CvSectionModeEnum } from '../../../shared/enums';
import { AnonymousProfileAppearance, AnonymousProfileCreate } from '../../models';
import { map } from 'rxjs';

@Component({
  selector: 'jf-cv-view-edit',
  templateUrl: './cv-view-edit.component.html',
  standalone: false
})
export class CvViewComponent implements OnInit {

  @ViewChild('editCvSectionComponent', { read: ViewContainerRef }) cvSectionComponentRef!: ViewContainerRef;

  @Input() id!: string;

  cvId: WritableSignal<string | undefined> = signal(undefined);
  showModal: boolean = false;
  deleteModal: Modal | null = null;
  deactivateModal!: Modal;
  editCvSectionTitle: string = '';
  createdComponentRef!: ComponentRef<any>;

  sectionType: typeof CvSectionTypeEnum = CvSectionTypeEnum;
  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;
  mode: CvSectionModeEnum = CvSectionModeEnum.Edit;

  deleteCvConfirmationText: string = 'Are you sure you want to delete this CV ?';

  private router: Router = inject(Router);
  private toaster: ToastrService = inject(ToastrService);
  private cvService: CurriculumVitaesService = inject(CurriculumVitaesService);
  private educationsService: EducationsService = inject(EducationsService);
  private languagesService: LanguagesInfoService = inject(LanguagesInfoService);
  private coursesService: CoursesService = inject(CoursesService);
  private skillsInfoService: SkillsService = inject(SkillsService);
  private workExperiencesService: WorkExperiencesService = inject(WorkExperiencesService);
  private personalInfoService: PersonalInfoService = inject(PersonalInfoService);
  private anonymousProfileService: AnonymousProfileService = inject(AnonymousProfileService);
  private nomenclatureService = inject(NomenclatureService);

  ngOnInit(): void {
    if (this.id) {
      this.cvId.set(this.id);
    }
  }

  readonly languageTypes: Signal<BasicModel<number>[]> = toSignal(this.nomenclatureService.getLanguageTypes(), { initialValue: [] });
  readonly educationLevels: Signal<BasicModel<number>[]> = toSignal(this.nomenclatureService.getEducationLevels(), { initialValue: [] });
  readonly languageLevels: Signal<BasicModel<number>[]> = toSignal(this.nomenclatureService.getLanguageLevels(), { initialValue: [] });
  readonly bussinessSectors: Signal<BasicModel<number>[]> = toSignal(this.nomenclatureService.getBusinessSectors(), { initialValue: [] });
  readonly countries: Signal<BasicModel<number>[]> = toSignal(this.nomenclatureService.getCountries(), { initialValue: [] });
  readonly citizenships: Signal<BasicModel<number>[]> = toSignal(this.nomenclatureService.getCitizenships(), { initialValue: [] });
  readonly genderOptions: Signal<BasicModel<number>[]> = toSignal(this.nomenclatureService.getGenderOptions(), { initialValue: [] });
  readonly drivingCategories: Signal<BasicModel<number>[]> = toSignal(this.nomenclatureService.getDrivingCategories(), { initialValue: [] });

  private readonly cvDataResource = rxResource({
    params: () => ({
      cvId: this.cvId()
    }),
    stream: ({ params }) => {
      return this.cvService
        .getCvListingData(params.cvId!)
        .pipe(
          map((cvData: CvListingData) => {
            const cvSkills: SkillsInfo = cvData.skills;
            cvSkills.licenseCategoriesText = this.getDrivingLicensesText(cvSkills.drivingLicenseCategories);
            return cvData;
          }));
    }
  });

  readonly cvData: WritableSignal<CvListingData | undefined> = this.cvDataResource.value;

  onCloseEditSectionModal = (): void => {
    this.createdComponentRef?.destroy();
  }

  editSection = (sectionType: CvSectionTypeEnum, modalElement: any): void => {
    const modal = new Modal(modalElement);

    switch (sectionType) {
      case CvSectionTypeEnum.PersonalInfo:
        this.editCvSectionTitle = "Edit Personal Details";
        this.onCreatePersonalInfoModalComponent();
        break;
      case CvSectionTypeEnum.EducationInfo:
        this.editCvSectionTitle = "Edit Educations info";
        this.onCreateEducationModalComponent();
        break;
      case CvSectionTypeEnum.WorkExperienceInfo:
        this.editCvSectionTitle = "Edit Work Experience info"
        this.onCreateWorkExperienceInfoComponent();
        break;
      case CvSectionTypeEnum.LanguagesInfo:
        this.editCvSectionTitle = "Edit Languages info"
        this.onCreateLanguagesInfoComponent();
        break;
      case CvSectionTypeEnum.SkillsInfo:
        this.editCvSectionTitle = "Edit Skills Info"
        this.onCreateSkillsModalComponent();
        break;
      case CvSectionTypeEnum.CoursesInfo:
        this.editCvSectionTitle = "Edit Courses info"
        this.onCreateCoursesInfoComponent();
        break;
      default:
        throw new TypeError("Unhandled section type.");
    }

    modal.show();
  }

  viewCV = (): void => {
    this.mode = CvSectionModeEnum.Edit;
  }

  viewAnonymousProfile = (): void => {
    this.mode = CvSectionModeEnum.AnonymousProfileView;
  }

  createAnonymousProfile = (): void => {
    this.cvData()!.workExperiences.forEach(e => e.includeInAnonymousProfile = true);
    this.cvData()!.educations.forEach(e => e.includeInAnonymousProfile = true);
    this.cvData()!.languagesInfo.forEach(l => l.includeInAnonymousProfile = true);
    this.cvData()!.courseCertificates.forEach(cs => cs.includeInAnonymousProfile = true);
    this.mode = CvSectionModeEnum.AnonymousProfileCreate;
  }

  discardAnonymousProfile = (): void => {
    this.mode = CvSectionModeEnum.Edit;
  }

  activateAnonymousProfile = (profileAppearanceData: AnonymousProfileAppearance): void => {
    this.anonymousProfileService
      .create(
        this.id,
        this.constructAnonymousProfileActivationData(profileAppearanceData))
      .subscribe({
        next: (data: IdentityResult<string>) => {
          this.cvData()!.anonymousProfileId = data.id;
          this.cvData()!.canActivateAnonymousProfile = false;
          this.mode = CvSectionModeEnum.AnonymousProfileView;
          this.toaster.success('Successfully activated anonymous profile!');
        },
        error: (error: HttpErrorResponse) => this.toaster.error(error.error.errors)
      });
  }

  deactivateAnonymousProfile = (modalElement: Element): void => {
    this.deactivateModal = new Modal(modalElement);
    this.deactivateModal.show();
  }

  onDeactivateAnonymousProfile = (): void => {
    this.anonymousProfileService
      .delete(this.cvData()!.anonymousProfileId!)
      .subscribe({
        next: () => {
          this.cvData()!.anonymousProfileId = null;
          this.cvData()!.canActivateAnonymousProfile = true;
          this.mode = CvSectionModeEnum.View;
          this.deactivateModal.hide();
          this.toaster.success('Successfully deactivated anonymous profile!');
        },
        error: (error: HttpErrorResponse) => {
          this.deactivateModal.hide();
          this.toaster.error(error.error.errors);
        }
      });
  }

  setAnonymousProfileAppearanceCriterias = (): void => {
    this.mode = CvSectionModeEnum.AnonymousProfileSetAppearanceCriterias;
  }

  onProfileAppearanceDataEmit = (profileAppearanceData: AnonymousProfileAppearance): void => {
    this.activateAnonymousProfile(profileAppearanceData);
  }

  deleteCv(modalElement: Element): void {
    let messageAffix: string = '';

    if (this.cvData()!.applicationForActiveAd) {
      messageAffix += ' This CV has been sent as an application for a job that is still active.';
    }

    if (this.cvData()!.approvedCvPreviewForActiveAd) {
      messageAffix += ' There is an approved company request for this CV preview that is suitable for an active job.'
    }

    this.deleteCvConfirmationText += messageAffix;
    this.deleteModal = new Modal(modalElement);
    this.deleteModal.show();
  }

  onDeleteCv = (): void => {
    this.cvService.delete(this.id)
      .subscribe({
        next: () => {
          this.toaster.success(`CV '${this.cvData()!.name}' is deleted successfully.`);
          this.router.navigate(['/profile/cvs']);
        },
        error: (error: HttpErrorResponse) => {
          this.toaster.error(error.error);
        },
        complete: () => {
          this.deleteModal?.hide();
        }
      });
  }

  onCancelDeletion = (): void => {
    this.deleteModal?.hide();
  }

  onCancelDeactivateAnonymousProfile = (): void => {
    this.deactivateModal.hide();
  }

  private constructAnonymousProfileActivationData = (
    profileAppearanceData: AnonymousProfileAppearance): AnonymousProfileCreate => {

    const workExperienceInfoIds: number[] = this.cvData()!.workExperiences
      .filter(we => we.includeInAnonymousProfile)
      .map(we => we.id);

    const educationsIds: number[] = this.cvData()!.educations
      .filter(e => e.includeInAnonymousProfile)
      .map(e => e.id);

    const languageInfoIds: number[] = this.cvData()!.languagesInfo
      .filter(li => li.includeInAnonymousProfile)
      .map(li => li.id);

    const courseInfoIds: number[] = this.cvData()!.courseCertificates
      .filter(cs => cs.includeInAnonymousProfile)
      .map(cs => cs.id);

    return {
      workExpiriencesInfo: workExperienceInfoIds,
      educationsInfo: educationsIds,
      languagesInfo: languageInfoIds,
      coursesInfo: courseInfoIds,
      profileAppearanceCriterias: { ...profileAppearanceData }
    } satisfies AnonymousProfileCreate;
  }

  private onCreateSkillsModalComponent = (): void => {
    const createdComponentRef: ComponentRef<SkillsInfoComponent> = this.cvSectionComponentRef
      .createComponent(SkillsInfoComponent);

    this.createdComponentRef = createdComponentRef;

    const component: SkillsInfoComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.drivingCategories = this.drivingCategories as InputSignal<BasicModel<number>[]>;
    component.skillsInfoData = this.cvData()!.skills;

    // TODO: refactor - nested subscribe

    component.emitSkillsData
      .subscribe({
        next: (newSkillsData: SkillsInfo) => {
          const requestData: SkillsInfoOutput = this.skillsInfoService.mapSkillsData(newSkillsData);

          this.skillsInfoService
            .update(this.id, requestData)
            .subscribe(() => {
              newSkillsData.licenseCategoriesText = this.getDrivingLicensesText(newSkillsData.drivingLicenseCategories);
              this.cvData()!.skills = newSkillsData;
              this.toaster.success("Skills info successfuly updated.");
            });
        },
        error: (err: HttpErrorResponse) => this.showErrors(err.error.errors, "Can't update skills info!")
      });
  }

  private onCreateWorkExperienceInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<WorkExperienceInfoComponent> = this.cvSectionComponentRef
      .createComponent(WorkExperienceInfoComponent);

    this.createdComponentRef = createdComponentRef;

    const component: WorkExperienceInfoComponent = createdComponentRef.instance;
    component.businessSectors = this.bussinessSectors as InputSignal<BasicModel<number>[]>;
    component.workExperienceInfoData = this.cvData()!.workExperiences;
    component.isEditMode = true;

    // TODO: refactor - nested subscribe

    component.emitWorkExperiencesData
      .subscribe((newWorkExperienceInfo: WorkExperienceInfo[]) => {

        const requestData: WorkExperienceOutput[] = this.workExperiencesService
          .mapWorkExperienceInfoData(newWorkExperienceInfo);

        this.workExperiencesService.update(this.id, requestData)
          .subscribe({
            next: (result: UpdateResult) => {
              this.setItemsIds(newWorkExperienceInfo, result.newItemsIds);
              this.cvData.update((currentCvData) => {
                currentCvData!.workExperiences = newWorkExperienceInfo;
                return currentCvData;
              });
              this.toaster.success("Work Experience info successfuly updated.");
            },
            error: (err: HttpErrorResponse) => this.showErrors(err.error.errors, "Can't update work experience info!")
          });
      });
  }

  private onCreateCoursesInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<CoursesCertificatesComponent> = this.cvSectionComponentRef
      .createComponent(CoursesCertificatesComponent);

    this.createdComponentRef = createdComponentRef;

    const component: CoursesCertificatesComponent = createdComponentRef.instance;

    component.isEditMode = true;
    component.coursesInfoData = this.cvData()!.courseCertificates;

    // TODO: refactor the nested subscribe

    component.emitCoursesData
      .subscribe({
        next: (data: CourseCertificateInfo[]) => {

          this.coursesService.update(this.id, data)
            .subscribe({
              next: (result: UpdateResult) => {
                this.setItemsIds(data, result.newItemsIds);
                this.cvData.update((currentCvData) => {
                  currentCvData!.courseCertificates = data;
                  return currentCvData;
                });
                this.toaster.success("Courses info successfuly updated.");
              }
            });
        },
        error: (err: HttpErrorResponse) => this.showErrors(err.error.errors, "Can't update courses info!")
      });
  }

  private onCreateLanguagesInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<LanguagesInfoComponent> = this.cvSectionComponentRef.createComponent(LanguagesInfoComponent);
    this.createdComponentRef = createdComponentRef;
    const component: LanguagesInfoComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.languagesInfoData = this.cvData()!.languagesInfo;
    component.languageTypes = this.languageTypes as InputSignal<BasicModel<number>[]>;
    component.languageLevels = this.languageLevels as InputSignal<BasicModel<number>[]>;

    // TODO: refactor - nested subscribe

    component.emitLanguagesInfo
      .subscribe((data: LanguageInfo[]) => {
        const requestData: LanguageInfoOutput[] = this.languagesService.mapLanguageInfoData(data);

        this.languagesService.update(this.id, requestData)
          .subscribe({
            next: (result: UpdateResult) => {
              this.setItemsIds(data, result.newItemsIds);
              this.cvData.update((currentCvData) => {
                currentCvData!.languagesInfo = data;
                return currentCvData;
              });
              this.toaster.success("Languages info successfuly updated.");
            },
            error: (err: HttpErrorResponse) => this.showErrors(err.error.errors, "Can't update languages info!")
          });
      });
  }

  private onCreateEducationModalComponent = (): void => {
    const createdComponentRef: ComponentRef<EducationsComponent> = this.cvSectionComponentRef
      .createComponent(EducationsComponent);
    this.createdComponentRef = createdComponentRef;
    const component: EducationsComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.educationsData = this.cvData()!.educations;
    component.educationLevels = this.educationLevels as InputSignal<BasicModel<number>[]>;

    // TODO: refactor - nested subscribe

    component.emitEducationData
      .subscribe((newEducationInfo: EducationInfo[]) => {
        const requestData: EducationOutput[] = this.educationsService.mapEducationInfoData(newEducationInfo);

        this.educationsService.update(this.id, requestData)
          .subscribe({
            next: (result: UpdateResult) => {
              this.setItemsIds(newEducationInfo, result.newItemsIds);
              this.cvData.update((currentCvData) => {
                currentCvData!.educations = newEducationInfo;
                return currentCvData;
              });
              this.toaster.success("Education info successfuly updated.");
            },
            error: (err: HttpErrorResponse) => this.showErrors(err.error.errors, "Can't update education info!")
          });
      });
  }

  private onCreatePersonalInfoModalComponent = (): void => {
    const createdComponentRef: ComponentRef<PersonalInfoComponent> = this.cvSectionComponentRef
      .createComponent(PersonalInfoComponent);
    this.createdComponentRef = createdComponentRef;
    const component: PersonalInfoComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.personalInfo = this.cvData()!.personalInfo;
    component.countries = this.countries as InputSignal<BasicModel<number>[]>;
    component.citizenships = this.citizenships as InputSignal<BasicModel<number>[]>;
    component.genderOptions = this.genderOptions as InputSignal<BasicModel<number>[]>;

    // TODO: refactor - nested subscribe

    component.emitPersonalInfo
      .subscribe((data: PersonalInfo) => {
        const requestData: PersonalInfoOutput = this.personalInfoService.mapPersonalInfo(data);

        this.personalInfoService
          .update(this.cvData()!.id, requestData)
          .subscribe({
            next: () => {
              this.cvData()!.personalInfo = { ...data };
              this.toaster.success("Personal Details successfuly updated.");
            },
            error: (err: HttpErrorResponse) => this.showErrors(err.error.errors, "Can't update personal details!")
          });
      });
  }

  private getDrivingLicensesText = (drivingLicenseCategories: BasicModel<number>[]): string => {
    return drivingLicenseCategories.length > 0
      ? drivingLicenseCategories.map(x => x.name).join(', ')
      : 'no driving license';
  }

  private setItemsIds = (items: any[], ids: number[]): void => {
    let index = 0;
    items.forEach((element: any) => {
      if (!element.id) {
        element.id = ids[index++];
      }
    });
  }

  private showErrors = (errors: any, errorTitle: string): void => {
    let errorMessage = '';
    for (let propName in errors) {
      errorMessage += errors[`${propName}`].join(' ');
    }
    this.toaster.error(errorMessage, errorTitle);
  }
}
