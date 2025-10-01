import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { LoginResultModel } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationConstants } from '../../constants';

@Component({
  selector: 'jf-login',
  templateUrl: './login.component.html',
  standalone: false
})
export class LoginComponent implements OnInit {

  form!: FormGroup<LoginForm>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  onSubmitLoginForm = (form: FormGroup<LoginForm>): void => {
    if (form.valid) {
      this.login();
    }
  }

  private initializeLoginForm(): void {
    this.form = this.fb.group<LoginForm>({
      email: new FormControl(
        '',
        {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(ValidationConstants.emailPattern)]
        }),
      password: new FormControl(
        '',
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)]
        })
    });
  }

  private login(): void {
    this.authService
      .login(this.form.value)
      .subscribe({
        next: (loginResult: LoginResultModel) => {
          this.setData(loginResult);
          this.authService.isLoggedIn.next(true);
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.title)
      });
  }

  private setData(loginResult: LoginResultModel): void {
    localStorage.setItem('token', loginResult.token);
    localStorage.setItem('username', loginResult.username);
    localStorage.setItem('roles', JSON.stringify(loginResult.roles));
  }
}

interface LoginForm {
  email: FormControl<string>,
  password: FormControl<string>
}
