import { Routes } from '@angular/router';
import { CustomerList } from './customer-list/customer-list';
import {Login} from './login/login';
import {Register} from './register/register';
import {PricingPlan} from './pricing-plan/pricing-plan';
import {Home} from './home/home';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: PricingPlan, },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerList, },
  { path: 'login', component: Login, },
  { path: 'register', component: Register, },
];
