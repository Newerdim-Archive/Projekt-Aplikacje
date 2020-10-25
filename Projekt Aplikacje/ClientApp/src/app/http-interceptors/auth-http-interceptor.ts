import { JwtHelperService } from '@auth0/angular-jwt';
import {
  retry,
  catchError,
  switchMap,
  subscribeOn,
  finalize,
  tap,
  take,
  last,
} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  error = false;
  cachedRequest: HttpRequest<any>;

  constructor(private authSerivce: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if request is for refreshing tasks
    if (req.url.includes('refresh')) {
      return next.handle(this.updateHeader(req)).pipe(
        catchError((error: HttpErrorResponse) => {
          this.error = true;
          if (error.status === 401 || error.status === 400) {
            this.authSerivce.logOut();
          }
          this.router.navigate(['/error']);
          return throwError(error);
        }),
        finalize(() => {
          if (!this.error) {
            // send cached request
            return next.handle(this.updateHeader(this.cachedRequest));
          }
        })
      );
    } else if (this.authSerivce.areTokensNeedRefresh()) {
      // Cache request and refresh tokens
      this.cachedRequest = req;
      return this.authSerivce.refreshTokens().pipe(
        switchMap(() => {
          return next.handle(this.updateHeader(req));
        })
      );
    } else {
      return next.handle(this.updateHeader(req));
    }
  }

  // Add cookies and authorization
  updateHeader(req: HttpRequest<any>): HttpRequest<any> {
    req = req.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${this.authSerivce.accessToken}`,
      },
    });

    return req;
  }

  retryFailedRequests(): void {}
}
