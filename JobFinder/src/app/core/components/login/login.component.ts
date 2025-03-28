import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'jf-login',
  templateUrl: './login.component.html',
  standalone: false
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
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
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
        localStorage.setItem('token', data['token']);
        localStorage.setItem('username', data['username']);
        const isAdmin: boolean = data['role'] === 'Admin' ? true : false;
        localStorage.setItem('isAdmin', String(isAdmin));
        const isCompany: boolean = data['role'] === 'Company' ? true : false;
        localStorage.setItem('isCompany', String(isCompany));

        this.authService.isLoggedIn.next(true);

        this.router.navigate(['/home']);
      });
  }
}
