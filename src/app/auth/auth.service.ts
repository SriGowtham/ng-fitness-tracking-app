import { inject, Injectable } from '@angular/core';
import { AuthData } from './modal/auth-data.modal';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private fireAuth = inject(Auth);
  private snackBar = inject(MatSnackBar)
  authDone = new Subject<boolean>();
  private authSucessfull : boolean
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
       this.snackBar.open(error.message, null , {
        duration: 3000
       })
      });
  }

  userLogin(authData: AuthData) {
    signInWithEmailAndPassword(this.fireAuth, authData.email, authData.password)
      .then(() => {
        this.authSuccessful();
      })
      .catch((error) => {
        this.snackBar.open(error.message, null , {
        duration: 3000
       })
      });
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
    this.router.navigate(['/training']);
  }
}
