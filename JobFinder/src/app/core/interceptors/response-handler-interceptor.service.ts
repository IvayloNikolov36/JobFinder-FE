import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable, isDevMode } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
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
          let errorMessage: string = '';

          const serverError: boolean = err.status.toString().startsWith('50');
          const clientError: boolean = err.status.toString().startsWith('4');

          if (serverError) {
            this.toastr.error(err.error.message, err.error.guid);
          } else if (clientError) {
            if (!err.error) {
              // 404 not found - consider what to do
              errorMessage = err.message; 
            } else {
              const errors: unknown = err.error.errors;

              if (Array.isArray(errors)) {
                errors.forEach((value: string) => {
                  errorMessage = errorMessage.concat(' ' + value);
                });
              } else {
                const errs = errors as any;
                for (let e in errs) {
                  errorMessage = errorMessage.concat(' ' + errs[e].join(' '));
                }
              }

              this.toastr.error(errorMessage);
            }
          } else {
            errorMessage = err.error;
          }

          if (isDevMode()) {
            console.log(err);
            console.log(errorMessage);
          }

          throw err;
        })
      ) as any;
  }
}
