import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
    this.authService.logOut();
  }
}
