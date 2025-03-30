import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../functions/must-match';
import { ToastrService } from 'ngx-toastr';
import { RegisterUserModel } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationConstants as c } from '../../constants';

@Component({
  selector: 'jf-register-user',
  templateUrl: './register-user.component.html',
  standalone: false
})
export class RegisterUserComponent implements OnInit {

  form!: FormGroup<RegisterUserForm>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  register() {
    this.authService
      .registerUser(this.form.value as RegisterUserModel)
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors.join(' '))
      });
  }

  private initializeRegisterForm(): void {
    this.form = this.fb.group<RegisterUserForm>({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(c.emailPattern)] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.passwordMinLength), Validators.maxLength(c.passwordMaxLength)] }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.passwordMinLength), Validators.maxLength(c.passwordMaxLength)] }),
      firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.minNameLength), Validators.maxLength(c.maxNameLength)] }),
      middleName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.minNameLength), Validators.maxLength(c.maxNameLength)] }),
      lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(c.minNameLength), Validators.maxLength(c.maxNameLength)] }),
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      } as AbstractControlOptions
    );
  }
}

interface RegisterUserForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;
}
