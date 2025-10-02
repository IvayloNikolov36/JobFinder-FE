import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '../../functions';
import { AuthService } from '../../services';
import { ResetPassword } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jf-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: false,
})
export class ResetPasswordComponent implements OnInit {

  form!: FormGroup<ResetPasswordForm>;
  email!: string;
  token!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setQueryParams();
    this.initializeForm();
  }

  onSubmitResetPassword = (form: FormGroup<ResetPasswordForm>): void => {
    const model = { ...form.value, email: this.email, token: this.token } as ResetPassword;

    this.authService.resetPassword(model)
      .subscribe({
        next: () => {
          this.toastr.success('Password is successfully reset!');
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors)
      });
  }

  private setQueryParams = (): void => {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.email = params.email;
      this.token = params.token;
    });
  }

  private initializeForm = (): void => {
    this.form = this.formBuilder.group<ResetPasswordForm>({
      "newPassword": new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      "confirmPassword": new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
    }, {
      validator: MustMatch("newPassword", "confirmPassword",)
    } as AbstractControlOptions);
  }
}

interface ResetPasswordForm {
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}
