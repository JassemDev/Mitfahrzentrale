import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CreateRideComponent } from './create-ride/create-ride.component';
import { PassengerDashboardComponent } from './passenger-dashboard/passenger-dashboard.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-ride', component: CreateRideComponent, canActivate: [AuthGuard] },
  { path: 'driver-dashboard', component: DriverDashboardComponent },
  { path: 'passenger-dashboard', component: PassengerDashboardComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
