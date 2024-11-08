import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'jf-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit = (form: FormGroup): void => {
    if (form.valid) {
      this.login();
    }
  }

  private login(): void {
    this.authService
      .login(this.form.value)
      .subscribe((data: any) => {
        const token: string = data['token'];
        localStorage.setItem('token', token);

        const name: string = data['username'];
        localStorage.setItem('username', name);

        const isAdmin: boolean = data['role'] === 'Admin' ? true : false;
        localStorage.setItem('isAdmin', String(isAdmin));

        const isCompany: boolean = data['role'] === 'Company' ? true : false;
        localStorage.setItem('isCompany', String(isCompany));

        this.router.navigate(['/home']);
      });
  }
}
