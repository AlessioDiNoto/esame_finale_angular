import { CodiceFiscaleCardComponent } from './pages/codice-fiscale/components/codice-fiscale-card/codice-fiscale-card.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { WeatherComponent } from './pages/weather/weather/weather.component';
import { WeatherReportComponent } from './pages/weather/weather-report/weather-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'weather',
    component: WeatherComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':locationName',
        component: WeatherReportComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'codice-fiscale',
    component: CodiceFiscaleCardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
