import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import Swal from 'sweetalert2';

declare const checkInputs;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Oczekiwanie na odpowiedź od serwera...',
        willOpen: () => {
          Swal.showLoading();
        },
      });
      this.authService
        .login(this.username.value, this.password.value)
        .subscribe(
          (result) => {
            this.authService.saveTokensFromResult(result);

            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Zalogowano pomyślnie!',
              text: 'Za chwilę zostaniesz przekierowany na stronę główną.',
              timer: 2000,
              timerProgressBar: true,
              onClose: () => {
                this.router.navigate(['/']);
              },
            });
          },
          (error: HttpErrorResponse) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: `Oops...`,
              text: error.error,
            });
            this.errorMessage = error.error;
          }
        );
    }
  }
  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
