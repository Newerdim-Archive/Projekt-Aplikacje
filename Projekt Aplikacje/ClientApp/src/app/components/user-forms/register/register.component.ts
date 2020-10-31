import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
        ],
      ],
      password: [
        '',
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd@$!%*#?&]+$/),
      ],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      Swal.fire({
        title: 'Oczekiwanie na odpowiedź od serwera...',
        timerProgressBar: true,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      this.authService
        .register(this.username.value, this.email.value, this.password.value)
        .subscribe(
          () => {
            // this.router.navigate(['/login']);
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Konto zostało założone pomyślnie!',
              text: 'Możesz się zalogować.',
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
    return this.registerForm.get('username');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
}
