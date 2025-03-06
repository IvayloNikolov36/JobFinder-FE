import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { UsersModule } from './users/users.module';
import { ResponseHandlerInterceptorService } from './core/interceptors/response-handler-interceptor.service';
import { SharedModule } from './shared/shared.module';
import {
  CompanyDetailsComponent,
  HomeComponent,
  JobAdComponent,
  JobAdsListing,
  JobAdvertisementDetailsComponent,
  LoginComponent,
  PaginationComponent,
  RegisterCompanyComponent,
  RegisterUserComponent
} from './components';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CompaniesModule } from './companies/companies.module';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    JobAdsListing,
    PaginationComponent,
    JobAdvertisementDetailsComponent,
    CompanyDetailsComponent,
    PersonalDetailsComponent,
    JobAdComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    UsersModule,
    CompaniesModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
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
