import { inject, Injectable } from '@angular/core';
import { AuthData } from './modal/auth-data.modal';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { SnackBarService } from '../shared/snackbar.service';
import { SpinnerService } from '../shared/spinner.service.ts';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private fireAuth = inject(Auth);
  authDone = new Subject<boolean>();
  private authSucessfull : boolean;
  private snackBarService = inject(SnackBarService);
  private spinnerService = inject(SpinnerService)
  constructor() {}

  userRegister(authData: AuthData) {
    this.spinnerService.loadingState.next(true)
    createUserWithEmailAndPassword(
      this.fireAuth,
      authData.email,
      authData.password
    )
      .then(() => {
        this.spinnerService.loadingState.next(false)
        this.authSuccessful();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.spinnerService.loadingState.next(false)
        this.snackBarService.showSnackBar(error, null , 3000)
       })
  }

  userLogin(authData: AuthData) {
    this.spinnerService.loadingState.next(true)
    signInWithEmailAndPassword(this.fireAuth, authData.email, authData.password)
      .then(() => {
        this.spinnerService.loadingState.next(false)
        this.authSuccessful();
        this.router.navigate(['/training']);
      })
      .catch((error) => {
        this.spinnerService.loadingState.next(false)
         this.snackBarService.showSnackBar(error, null , 3000)
       })
  }

  logout() {
    this.authSucessfull = null
    this.authDone.next(false);
  }

  isAuth() {
    return this.authSucessfull
  }

  private authSuccessful() {
    this.authSucessfull = true
    this.authDone.next(true);
  }
}
