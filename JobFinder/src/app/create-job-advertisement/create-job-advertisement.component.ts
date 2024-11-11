import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JobAdvertisementsService } from '../services/job-advertisements.service';
import { BasicModel } from '../models/basic.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'jf-create-job-advertisement',
  templateUrl: './create-job-advertisement.component.html'
})
export class CreateJobAdvertisementComponent {

  form!: FormGroup;

  jobCategories$: Observable<BasicModel[]>;
  jobEngagements$: Observable<BasicModel[]>;

  chosedCategory: any;
  chosedEngagement: any;

  constructor(
    private jobAdsService: JobAdvertisementsService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {

    this.jobCategories$ = this.jobAdsService.getCategories();
    this.jobEngagements$ = this.jobAdsService.getEngagements();
  }

  ngOnInit() {
    this.form = this.fb.group({
      position: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(90)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      minSalary: [null, [Validators.min(1)]],
      maxSalary: [null, [Validators.min(1)]],
      jobCategoryId: ['', [Validators.required]],
      jobEngagementId: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  changeJobCategory(event: any): void {
    const selectedValue: any = event.target.value;
    const value: string = selectedValue.split(':')[0];
    this.chosedCategory = parseInt(value, 10);
  }

  changeJobEngagement(event: any): void {
    const selectedValue: any = event.target.value;
    const value: string = selectedValue.split(':')[0];
    this.chosedEngagement = parseInt(value, 10);
  }

  createOffer(): void {
    this.form.controls['jobCategoryId'].setValue(this.chosedCategory);
    this.form.controls['jobEngagementId'].setValue(this.chosedEngagement);

    this.jobAdsService.createjobAd(this.form.value)
      .subscribe(() => {
        this.toastr.success("Job Advertisement is created.", "Success");
        this.router.navigate(['/home']);
      });
  }
}