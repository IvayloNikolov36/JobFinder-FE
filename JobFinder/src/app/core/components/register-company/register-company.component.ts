import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../functions';

@Component({
  selector: 'jf-register-company',
  templateUrl: './register-company.component.html',
  standalone: false
})
export class RegisterCompanyComponent implements OnInit {

  form!: FormGroup;
  readonly emailPattern: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  registerCompany(): void {
    this.authService.registerComapny(this.form.value)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  private initializeRegisterForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      logo: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      companyName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
      bulstat: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(13)]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    } as AbstractControlOptions);
  }
}
