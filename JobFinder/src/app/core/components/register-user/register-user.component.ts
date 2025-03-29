import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../functions/must-match';
import { ToastrService } from 'ngx-toastr';
import { RegisterUserModel } from '../../models';

const MinNameLength: number = 2;
const MaxNameLength: number = 25;
const PasswordMinLength: number = 6;
const PasswordMaxLength: number = 35;

@Component({
  selector: 'jf-register-user',
  templateUrl: './register-user.component.html',
  standalone: false
})
export class RegisterUserComponent implements OnInit {

  form!: FormGroup<RegisterUserForm>;
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

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
        error: (err: any) => this.toastr.error(err.error.errors.join(' '))
      });
  }

  private initializeRegisterForm(): void {
    this.form = this.fb.group<RegisterUserForm>({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(this.emailPattern)] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(PasswordMinLength), Validators.maxLength(PasswordMaxLength)] }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(PasswordMinLength), Validators.maxLength(PasswordMaxLength)] }),
      firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(MinNameLength), Validators.maxLength(MaxNameLength)] }),
      middleName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(MinNameLength), Validators.maxLength(MaxNameLength)] }),
      lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(MinNameLength), Validators.maxLength(MaxNameLength)] }),
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
