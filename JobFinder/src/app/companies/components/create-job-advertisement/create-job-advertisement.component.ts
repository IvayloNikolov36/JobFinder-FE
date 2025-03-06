import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasicModel } from '../../../models';
import { NomenclatureService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';
import { CompanyJobAdsService } from '../services';

@Component({
  selector: 'jf-create-job-advertisement',
  templateUrl: './create-job-advertisement.component.html',
  standalone: false
})
export class CreateJobAdvertisementComponent {

  form!: FormGroup;
  jobCategories$!: Observable<BasicModel[]>;
  jobEngagements$!: Observable<BasicModel[]>;

  constructor(
    private jobAdsService: CompanyJobAdsService,
    private nomenclatureService: NomenclatureService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadNomenclatureData();
    this.initializeJobAdvertisementForm();
  }

  changeJobCategory(categoryId: number): void {
    this.form.controls['jobCategoryId'].setValue(categoryId);
  }

  changeJobEngagement(engagementId: number): void {
    this.form.controls['jobEngagementId'].setValue(engagementId);
  }

  publishAd(): void {
    this.jobAdsService.createJobAd(this.form.value)
      .subscribe(() => {
        this.toastr.success("The Job Advertisement is published successfully.", "Success");
        this.router.navigate(['/home']);
      });
  }

  private initializeJobAdvertisementForm(): void {
    this.form = this.fb.group({
      position: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(90)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      minSalary: [null, [Validators.min(1)]],
      maxSalary: [null, [Validators.min(1)]],
      jobCategoryId: [null, [Validators.required]],
      jobEngagementId: [null, [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  private loadNomenclatureData(): void {
    this.jobCategories$ = this.nomenclatureService.getJobCategories();
    this.jobEngagements$ = this.nomenclatureService.getJobEngagements();
  }
}
