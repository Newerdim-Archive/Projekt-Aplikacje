import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

declare const initialNav;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    initialNav();
  }

  getUsername(): string {
    return this.authService.username;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut(): void {
    Swal.close();
    Swal.fire({
      icon: 'warning',
      title: 'Czy na pewno chcesz się wylogować?',
      showCancelButton: true,
      confirmButtonText: 'Tak, wyloguj mnie.',
      cancelButtonText: 'Nie. Zostanę jeszcze trochę.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut();
      }
    });
  }
}
