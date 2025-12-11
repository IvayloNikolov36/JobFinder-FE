import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptorService, ResponseHandlerInterceptorService } from './core/interceptors';
import { SharedModule } from './shared/shared.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { ChangePasswordComponent, ForgottenPasswordComponent, HomeComponent, LoginComponent, RegisterCompanyComponent, RegisterUserComponent, ResetPasswordComponent } from './core/components';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    ChangePasswordComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    UsersModule,
    CompaniesModule,
  ],
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }