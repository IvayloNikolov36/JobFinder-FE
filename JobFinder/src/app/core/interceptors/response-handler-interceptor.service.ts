import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable, isDevMode } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

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
        catchError((err: HttpErrorResponse) => {
          if (isDevMode()) {
            let errorMessage = '';

            if (err.status === 400) {
              errorMessage = err.error.title;

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
            } else {
              errorMessage = err.error;
            }

            console.log(errorMessage);
          }

          throw err;
        })
      ) as any;
  }
}
