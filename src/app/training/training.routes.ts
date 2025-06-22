import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

export const trainingRoutes: Routes = [
  {
    path: 'training',
    loadComponent: () => import('./training').then(m => m.TrainingComponent),
    canActivate: [AuthGuard],
    providers : [
      provideState('training', trainingReducer)
    ]
  }
];
