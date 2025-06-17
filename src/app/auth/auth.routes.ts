import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUpComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  }
];
