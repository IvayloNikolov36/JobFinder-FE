import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
      .handle(request)
      .pipe(
        tap((success: HttpEvent<any>) => {
          if (success instanceof HttpResponse) {
            if (success?.url?.endsWith('login') || success?.url?.includes('register')) {
              this.toastr.success(success.body?.message, 'Success');
            }
          }
        }),
        catchError((err: any) => {
          let errorMessage: string = err.error.title;

          const errors: any = err.error.errors;
          const hasErrors: boolean = errors !== undefined;

          if (hasErrors) {
            for (const errType of Object.values(errors)) {
              const arrayOfErrors: string[] = errType as string[];

              arrayOfErrors.forEach((value: string) => {
                errorMessage = errorMessage.concat(' ' + value);
              });
            }
          }

          this.router.navigate(['/home']);

          throw err;
        })
      ) as any;
  }
}
