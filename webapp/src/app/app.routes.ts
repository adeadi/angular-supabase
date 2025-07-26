import { Routes } from '@angular/router';
import { CustomerList } from './customer-list/customer-list';
import {Login} from './login/login';
import {Landing} from './landing/landing';

export const routes: Routes = [
  { path: '', component: Landing, },
  { path: 'customer', component: CustomerList, },
  { path: 'login', component: Login, },
];
