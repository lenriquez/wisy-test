import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';
import { FourHundredAndFourComponent } from './404/404.component';

export const routes: Routes = [
  { path: 'weather/:id', component: WeatherComponent },
  { path: 'home', component: HomeComponent },
  { path: '404', component: FourHundredAndFourComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
