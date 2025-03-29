import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { LoginResultModel } from '../../models';

@Component({
  selector: 'jf-login',
  templateUrl: './login.component.html',
  standalone: false
})
export class LoginComponent implements OnInit {

  form!: FormGroup<LoginForm>;
  emailPattern: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

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
          validators: [Validators.required, Validators.pattern(this.emailPattern)]
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
        next: (data: any) => {
          const loginResult: LoginResultModel = data;
          this.setDataInStorage(data);
          this.authService.isLoggedIn.next(true);
          this.router.navigate(['/home']);
        },
        error: (err: any) => this.toastr.error(err.title)
      });
  }

  private setDataInStorage(loginResult: LoginResultModel): void {
    localStorage.setItem('token', loginResult.token);
    localStorage.setItem('username', loginResult.username);
    const isAdmin: boolean = loginResult.role === 'Admin' ? true : false;
    localStorage.setItem('isAdmin', String(isAdmin));
    const isCompany: boolean = loginResult.role === 'Company' ? true : false;
    localStorage.setItem('isCompany', String(isCompany));
  }
}

interface LoginForm {
  email: FormControl<string>,
  password: FormControl<string>
}
