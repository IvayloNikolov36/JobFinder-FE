import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'jf-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  isCompany: boolean = false;
  userName: string | null = null;
  subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    debugger;

    this.subscription = this.authService.isLoggedIn.subscribe((isLogged: boolean) => {
      debugger;
      this.isAuthenticated = isLogged;
      this.isCompany = this.authService.isCompany();
      this.userName = this.authService.getUserName();
    });
  }

  ngOnDestroy(): void {
    debugger;
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}