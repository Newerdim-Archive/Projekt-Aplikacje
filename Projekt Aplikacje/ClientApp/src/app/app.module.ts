import { RegisterComponent } from './components/user-forms/register/register.component';
import { LoginComponent } from './components/user-forms/login/login.component';
import { AuthHttpInterceptor } from './http-interceptors/auth-http-interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormsComponent } from './components/user-forms/user-forms.component';
import { DataGroupComponent } from './components/data-group/data-group.component';
import { DataComponent } from './components/data-group/data/data.component';
import { DataFormComponent } from './components/data-form/data-form.component';

import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { CalculatorsComponent } from './components/calculators/calculators.component';
import { ErrorComponent } from './components/error/error.component';
import { BmiComponent } from './components/calculators/bmi/bmi.component';
import { BmrComponent } from './components/calculators/bmr/bmr.component';
registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserFormsComponent,
    DataGroupComponent,
    DataComponent,
    DataFormComponent,
    CalculatorsComponent,
    ErrorComponent,
    BmiComponent,
    BmrComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    CookieService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
