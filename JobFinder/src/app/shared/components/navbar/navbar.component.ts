import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jf-navbar',
  templateUrl: './navbar.component.html',
  standalone: false
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  isCompany: boolean = false;
  userName: string | null = null;
  subscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe((isLogged: boolean) => {
      this.isAuthenticated = isLogged;
      this.isCompany = this.authService.isCompany();
      this.userName = this.authService.getUserName();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
