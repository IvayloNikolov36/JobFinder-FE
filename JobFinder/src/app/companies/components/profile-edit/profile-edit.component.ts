import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyProfileService } from '../../services';
import { CompanyEditModel } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-profile-edit',
  templateUrl: './profile-edit.component.html',
  standalone: false,
})
export class ProfileEditComponent implements OnInit {

  form!: FormGroup<CompanyEditForm>;

  readonly minEmployeesCount: number = 0;
  readonly maxEmployeesCount: number = Number.MAX_VALUE;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyProfileService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  submitCompanyForm = (): void => {
    if (this.form.valid) {
      this.companyService.update(this.form.value as CompanyEditModel)
        .subscribe({
          next: () => { 
            this.toastr.success("Copany details are successfully updated!");
            this.router.navigate(["/companies/profile"]);
          },
          error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors)
        });
    }
  }

  private initializeForm = (): void => {
    this.form = this.formBuilder.group<CompanyEditForm>({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6), Validators.maxLength(100)] }),
      bulstat: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(9), Validators.maxLength(13)] }),
      employees: new FormControl(this.minEmployeesCount, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(this.minEmployeesCount),
          Validators.maxLength(this.maxEmployeesCount)
        ]
      })
    });
  }
}

interface CompanyEditForm {
  name: FormControl<string>,
  bulstat: FormControl<string>,
  employees: FormControl<number>
}
