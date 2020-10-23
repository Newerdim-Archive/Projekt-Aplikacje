import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataSummaryComponent } from './components/data-summary/data-summary.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'data', component: DataSummaryComponent, pathMatch: 'full' },
  { path: 'zaloguj', component: LoginComponent, pathMatch: 'full' },
  { path: 'zarejestruj', component: RegisterComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
