import { Router } from '@angular/router';
import { User } from './../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { tap, switchMap } from 'rxjs/operators';

const REFRESH_TOKEN = 'refreshToken';
const ACCESS_TOKEN = 'accessToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {}

  get username(): string {
    let username = this.jwtHelperService.decodeToken(this.refreshToken)
      ?.unique_name;

    if (!username) {
      username = this.jwtHelperService.decodeToken(this.accessToken)
        ?.unique_name;
    }

    return username;
  }

  get accessToken(): string {
    return sessionStorage.getItem(ACCESS_TOKEN);
  }

  get refreshToken(): string {
    return this.cookieService.get(REFRESH_TOKEN);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + '/user/login',
      new User({
        username,
        password,
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + '/user/register',
      new User({
        username,
        email,
        password,
      })
    );
  }

  refreshTokens(): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any>(environment.apiUrl + '/user/refresh-tokens').subscribe(
        (result) => {
          this.saveTokensFromResult(result);
          observer.next();
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          observer.error(error);
        }
      );
    });
  }

  saveTokensFromResult(result: any): void {
    sessionStorage.setItem(ACCESS_TOKEN, result.accessToken);
    this.cookieService.set(REFRESH_TOKEN, result.refreshToken);
  }

  deleteTokens(): void {
    sessionStorage.removeItem(ACCESS_TOKEN);
    this.cookieService.delete(REFRESH_TOKEN, '/');
  }

  isAccessTokenExpired(): boolean {
    return this.jwtHelperService.isTokenExpired(this.accessToken);
  }

  isRefreshTokenExpired(): boolean {
    return this.jwtHelperService.isTokenExpired(this.refreshToken);
  }

  areTokensNeedRefresh(): boolean {
    return this.isAccessTokenExpired() && !this.isRefreshTokenExpired();
  }

  areTokensExpired(): boolean {
    return this.isRefreshTokenExpired() || this.isAccessTokenExpired();
  }

  isLoggedIn(): boolean {
    return !this.isRefreshTokenExpired() || !this.isAccessTokenExpired();
  }

  logOut(): void {
    this.deleteTokens();
    this.router.navigateByUrl('/login');
  }
}
