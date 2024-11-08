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
    public toastr: ToastrService,
    private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
      .handle(req)
      .pipe(tap((success: HttpEvent<any>) => {

        if (success instanceof HttpResponse) {

          if (success?.url?.endsWith('login') || success?.url?.includes('register')
            || success?.url?.includes('create') || success?.url?.includes('delete')
            || success.url?.includes('edit')) {

            this.toastr.success(success.body.message, 'Success');
          }
        }
      }), catchError((err: any) => {

        let errMsg = err.error.title;

        const hasErrors = err.error.errors !== undefined;

        if (hasErrors) {

          for (const errType of Object.values(err.error.errors)) {

            const arrayOfErrors = errType as string[];

            arrayOfErrors.forEach((value: string) => {
              errMsg = errMsg.concat(' ' + value);
            });
          }
        }

        console.log('Error message: ' + errMsg);

        this.toastr.error(errMsg, 'Error');

        this.router.navigate(['/home']);

        throw err;
      })) as any as any;
  }
}
