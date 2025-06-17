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


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private fireAuth = inject(Auth);
  authDone = new Subject<boolean>();
  private authSucessfull : boolean;
  private snackBarService = inject(SnackBarService)
  constructor() {}

  userRegister(authData: AuthData) {
    createUserWithEmailAndPassword(
      this.fireAuth,
      authData.email,
      authData.password
    )
      .then(() => {
        this.authSuccessful();
      })
      .catch((error) => {
        this.snackBarService.showSnackBar(error, null , 3000)
       })
  }

  userLogin(authData: AuthData) {
    signInWithEmailAndPassword(this.fireAuth, authData.email, authData.password)
      .then(() => {
        this.authSuccessful();
      })
      .catch((error) => {
         this.snackBarService.showSnackBar(error, null , 3000)
       })
  }

  logout() {
    this.authSucessfull = null
    this.authDone.next(false);
    this.snackBarService.showSnackBar('Sucessfully Logged out' , null , 2000)
  }

  isAuth() {
    return this.authSucessfull
  }

  private authSuccessful() {
    this.authSucessfull = true
    this.authDone.next(true);
    this.router.navigate(['/training']);
  }
}
