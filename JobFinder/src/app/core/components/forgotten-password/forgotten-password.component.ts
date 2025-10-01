import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationConstants } from '../../constants';
import { AuthService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  standalone: false,
})
export class ForgottenPasswordComponent implements OnInit {
  form!: FormGroup<ForgottenPasswordForm>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmitForgotenPassword = (form: FormGroup<ForgottenPasswordForm>): void => {
    this.authService.requestLinkForPasswordChange(form.value.email as string)
      .subscribe({
        next: () => {
          this.toastr.success('Check your mail for a  password reset link.', 'Success');
          this.router.navigate(['/home']);
        },
        error: (err) => this.toastr.error(err.error.errors)
      })
  }

  private initializeForm = (): void => {
    this.form = this.formBuilder.group<ForgottenPasswordForm>({
      "email": new FormControl(
        '',
        {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(ValidationConstants.emailPattern)]
        })
    });
  }
}

interface ForgottenPasswordForm {
  email: FormControl<string>
}