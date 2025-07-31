import { Routes } from '@angular/router';
import { CustomerList } from './customer-list/customer-list';
import {Login} from './login/login';
import {Register} from './register/register';
import {PricingPlan} from './pricing-plan/pricing-plan';
import {Home} from './home/home';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: PricingPlan },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Home },
      { path: 'patients', component: CustomerList },
      { path: 'appointments', component: CustomerList }, // Replace with actual AppointmentComponent when created
      { path: 'profile', component: CustomerList }, // Replace with actual ProfileComponent when created
      { path: 'billing', component: CustomerList }, // Replace with actual BillingComponent when created
    ]
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' }

];
