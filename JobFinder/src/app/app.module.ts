import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { ResponseHandlerInterceptorService } from './core/interceptors/response-handler-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import {
  AdsFiltersComponent,
  CompanyDetailsComponent,
  HomeComponent,
  JobAdComponent,
  JobAdsListing,
  LoginComponent,
  PaginationComponent,
  RegisterCompanyComponent,
  RegisterUserComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    JobAdsListing,
    PaginationComponent,
    CompanyDetailsComponent,
    JobAdComponent,
    AdsFiltersComponent,
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
