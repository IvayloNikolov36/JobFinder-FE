import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';
import { MustMatch } from '../../functions';
import { ChangePassword } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jf-change-password',
  templateUrl: './change-password.component.html',
  standalone: false
})
export class ChangePasswordComponent implements OnInit {

  form!: FormGroup<ChangePasswordForm>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group<ChangePasswordForm>({
      currentPassword: new FormControl(
        '',
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)]
        }),
      newPassword: new FormControl(
        '',
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)]
        }),
      confirmPassword: new FormControl(
        '',
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)]
        }
      )
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    } as AbstractControlOptions);
  }

  onSubmitChangePassword = (form: FormGroup<ChangePasswordForm>): void => {
    this.authService.changePassword(form.value as ChangePassword)
      .subscribe({
        next: () => {
          this.toastr.success('Password is changed successfully.');
          this.authService.logout();
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => this.toastr.error(error.error.errors)
      });
  }
}

interface ChangePasswordForm {
  currentPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}