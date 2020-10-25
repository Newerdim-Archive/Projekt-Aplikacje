import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

declare const closeNav;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Natdim Health';

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router)
    )
    .subscribe(() => {
      closeNav();
      this.dataService.closeFormModal();
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
