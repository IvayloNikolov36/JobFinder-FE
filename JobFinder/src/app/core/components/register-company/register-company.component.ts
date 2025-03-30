import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../functions';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationConstants as c } from '../../constants';

@Component({
  selector: 'jf-register-company',
  templateUrl: './register-company.component.html',
  standalone: false
})
export class RegisterCompanyComponent implements OnInit {

  form!: FormGroup<RegisterCompanyForm>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  registerCompany(): void {
    this.authService.registerComapny(this.form.value)
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors.join(' '))
      });
  }

  private initializeRegisterForm(): void {
    this.form = this.fb.group<RegisterCompanyForm>({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(c.emailPattern)] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.passwordMinLength), Validators.maxLength(c.passwordMaxLength)] }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.passwordMinLength), Validators.maxLength(c.passwordMaxLength)] }),
      logo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.minNameLength), Validators.maxLength(c.maxNameLength)] }),
      middleName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.minNameLength), Validators.maxLength(c.maxNameLength)] }),
      lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.minNameLength), Validators.maxLength(c.maxNameLength)] }),
      companyName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.companyNameMinLength), Validators.maxLength(c.companyNameMaxLength)] }),
      bulstat: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.bulstatMinLength), Validators.maxLength(c.bulstatMaxLength)] })
    }, {
      validator: MustMatch('password', 'confirmPassword')
    } as AbstractControlOptions);
  }
}

interface RegisterCompanyForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  logo: FormControl<string>;
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;
  companyName: FormControl<string>;
  bulstat: FormControl<string>;
}
