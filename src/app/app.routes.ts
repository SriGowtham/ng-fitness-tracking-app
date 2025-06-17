import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { trainingRoutes } from './training/training.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./welcome/welcome').then(m => m.WelcomeComponent)
  },
  ...authRoutes,
  ...trainingRoutes
];
