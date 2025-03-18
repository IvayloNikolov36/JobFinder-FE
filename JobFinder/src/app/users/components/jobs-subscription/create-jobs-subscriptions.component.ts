import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasicModel } from '../../../models';
import { NomenclatureService } from '../../../core/services';
import { Observable } from 'rxjs';
import { SubscriptionsService } from '../../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobsSubscriptionCriterias } from '../../../shared/models';
import { JobSubscription } from '../../models';

@Component({
  selector: 'jf-create-jobs-subscriptions',
  templateUrl: './create-jobs-subscriptions.component.html',
  standalone: false
})
export class CreateJobsSubscriptionsComponent implements OnInit {

  @Output() emitSubscription: EventEmitter<JobSubscription> = new EventEmitter<JobSubscription>();

  form!: FormGroup;
  recurringTypes$!: Observable<BasicModel[]>;
  locations$!: Observable<BasicModel[]>;
  jobCategories$!: Observable<BasicModel[]>;
  jobEngagements$!: Observable<BasicModel[]>;

  subscriptionCriteriasErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private nomenclatureService: NomenclatureService,
    private subscriptionService: SubscriptionsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchNomenclatureData();
    this.initializeForm();
  }

  submitSubscriptionForm(): void {
    const subscription: JobsSubscriptionCriterias = this.form.value;

    if (subscription.searchTerm?.trim()?.length === 0) {
      subscription.searchTerm = null;
    }

    const areCriteriasValid: boolean = this.areSelectedJobSubscriptionCriteriasValid(subscription);

    if (!areCriteriasValid) {
      this.subscriptionCriteriasErrorMessage = 'You have to choose at least recurring type and one another criteria!';
      return;
    } else {
      this.subscriptionCriteriasErrorMessage = '';
    }

    this.subscriptionService.subscribeForJobsWithCriterias(this.form.value)
      .subscribe({
        next: (createdSubscription: JobSubscription) => {
          this.toastr.success("Successfull subscription.");
          this.emitSubscription.emit(createdSubscription);
        },
        error: (err) => this.toastr.error(err.error.errors[0])
      });
  }

  private areSelectedJobSubscriptionCriteriasValid(criterias: JobsSubscriptionCriterias): boolean {
    return criterias.jobCategoryId !== null
      || criterias.jobEngagementId !== null
      || criterias.locationId !== null
      || criterias.searchTerm !== null
      || criterias.intership
      || criterias.specifiedSalary;
  }

  private fetchNomenclatureData(): void {
    this.recurringTypes$ = this.nomenclatureService.getRecurringTypes();
    this.jobEngagements$ = this.nomenclatureService.getJobEngagements();
    this.jobCategories$ = this.nomenclatureService.getJobCategories();
    this.locations$ = this.nomenclatureService.getCities();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      recurringTypeId: [null, Validators.required],
      jobCategoryId: [null],
      jobEngagementId: [null],
      locationId: [null],
      intership: [false],
      specifiedSalary: [false],
      searchTerm: [null]
    });
  }
}
