import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { About } from './pages/about/about';
import { Team } from './pages/team/team';
import { Contact } from './pages/contact/contact';
import { Booking } from './pages/booking/booking';
import { Login } from './pages/admin/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: About },
  { path: 'team', component: Team },
  { path: 'contact', component: Contact },
  { path: 'booking', component: Booking },
  { path: 'admin/login', component: Login },
  { path: 'admin/dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];