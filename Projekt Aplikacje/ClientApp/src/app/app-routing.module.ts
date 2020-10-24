import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataSummaryComponent } from './components/data-summary/data-summary.component';
import { HomeComponent } from './components/home/home.component';
import { UserFormsComponent } from './components/user-forms/user-forms.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'dane/:dataName', component: DataSummaryComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'logowanie', component: UserFormsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
