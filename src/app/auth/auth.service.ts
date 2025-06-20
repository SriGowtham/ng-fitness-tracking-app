import { Inject, inject, Injectable } from '@angular/core';
import { AuthData } from './modal/auth-data.modal';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { SnackBarService } from '../shared/snackbar.service';
import { Store } from '@ngrx/store';
import * as appReducer from '../app.reducer'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private fireAuth = inject(Auth);
  authDone = new Subject<boolean>();
  private authSucessfull : boolean;
  private snackBarService = inject(SnackBarService);
  private store = inject(Store<{ui: appReducer.State}>)
  constructor() {}

  userRegister(authData: AuthData) {
    //this.spinnerService.loadingState.next(true)
   this.store.dispatch({type : 'START_LOADING'})
    createUserWithEmailAndPassword(
      this.fireAuth,
      authData.email,
      authData.password
    )
      .then(() => {
        this.store.dispatch({type : 'STOP_LOADING'})
        this.authSuccessful();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.store.dispatch({type : 'STOP_LOADING'})
        this.snackBarService.showSnackBar(error, null , 3000)
       })
  }

  userLogin(authData: AuthData) {
    this.store.dispatch({type : 'START_LOADING'})
    signInWithEmailAndPassword(this.fireAuth, authData.email, authData.password)
      .then(() => {
        this.store.dispatch({type : 'STOP_LOADING'})
        this.authSuccessful();
        this.router.navigate(['/training']);
      })
      .catch((error) => {
        this.store.dispatch({type : 'STOP_LOADING'})
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
