import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const trainingRoutes: Routes = [
  {
    path: 'training',
    loadComponent: () => import('./training').then(m => m.TrainingComponent),
    canActivate: [AuthGuard]
  }
];
