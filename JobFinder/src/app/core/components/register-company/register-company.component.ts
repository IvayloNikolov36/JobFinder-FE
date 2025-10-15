import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../functions';
import { ValidationConstants as c } from '../../constants';
import { CompanyRegisterModel } from '../../models';

@Component({
  selector: 'jf-register-company',
  templateUrl: './register-company.component.html',
  standalone: false
})
export class RegisterCompanyComponent implements OnInit {

  @ViewChild('fileInput', { read: ElementRef }) fileInput!: ElementRef<HTMLElement>;

  form!: FormGroup<RegisterCompanyForm>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  onCancelFileSelect(): void {
    this.form.controls.logo.markAsTouched();
  }

  onFileChange(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;
    const file: File | null = files === null ? null : files[0];
    this.form.patchValue({ logo: file });
  }

  registerCompany(): void {
    this.authService.registerCompany(this.form.value as CompanyRegisterModel, this.form.value.logo!)
      .subscribe({
        next: () => this.router.navigate(['/login'])
      });
  }

  private initializeRegisterForm(): void {
    this.form = this.fb.group<RegisterCompanyForm>({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(c.emailPattern)] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.passwordMinLength), Validators.maxLength(c.passwordMaxLength)] }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.passwordMinLength), Validators.maxLength(c.passwordMaxLength)] }),
      logo: new FormControl(null, { nonNullable: true, validators: [Validators.required] }),
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
  logo: FormControl<File | null>;
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;
  companyName: FormControl<string>;
  bulstat: FormControl<string>;
}
