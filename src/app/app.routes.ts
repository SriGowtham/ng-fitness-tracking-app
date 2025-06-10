import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome';
import { SignUpComponent } from './auth/sign-up/sign-up';
import { LoginComponent } from './auth/login/login';
import { TrainingComponent } from './training/training';

export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'training',
        component: TrainingComponent
    }
];