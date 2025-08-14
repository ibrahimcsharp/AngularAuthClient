import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenApiModel } from 'src/app/models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            // Swal.fire({
            //   title: 'Warning',
            //   text: 'Token is expired, login againg!',
            //   icon: 'error',
            //   confirmButtonText: 'OK'
            // });
            //this.router.navigate(['login']);
            return this.handleUnauthorizedError(request, next);
          }
        }
        return throwError(() => new Error("Some other error occured."))
      })
    );
  }

  handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApi = new TokenApiModel();
    tokenApi.accessToken = this.auth.getToken();
    tokenApi.refreshToken = this.auth.getRefreshToken();
    return this.auth.renewToken(tokenApi).
      pipe(
        switchMap((res: TokenApiModel) => {
          if (res && res.accessToken) {
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            req = req.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` }
            });
            return next.handle(req);
          }
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            Swal.fire({
              title: 'Warning',
              text: 'Token is expired, please login again!',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            this.router.navigate(['login']);
          }
          return throwError(() => new Error("Unauthorized request"));
        })
      );
  }
}
