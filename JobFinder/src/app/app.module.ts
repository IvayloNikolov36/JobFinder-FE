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
  CreateJobAdvertisementComponent,
  HomeComponent,
  JobAdvertisementsComponent,
  JobAdvertisementDetailsComponent,
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
    CreateJobAdvertisementComponent,
    JobAdvertisementsComponent,
    PaginationComponent,
    JobAdvertisementDetailsComponent,
    CompanyDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    UsersModule,
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
