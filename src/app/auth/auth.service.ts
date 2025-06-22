import { inject, Injectable } from '@angular/core';
import { AuthData } from './modal/auth-data.modal';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { SnackBarService } from '../shared/snackbar.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import { Authenticated, UnAuthenticated } from './auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private fireAuth = inject(Auth);
  private snackBarService = inject(SnackBarService);
  private store = inject(Store<fromRoot.State>)
  constructor() {}

  userRegister(authData: AuthData) {
    //this.spinnerService.loadingState.next(true)
   this.store.dispatch(new UI.StartLoading())
    createUserWithEmailAndPassword(
      this.fireAuth,
      authData.email,
      authData.password
    )
      .then(() => {
        this.store.dispatch(new UI.StopLoading())
        this.authSuccessful();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading())
        this.snackBarService.showSnackBar(error, null , 3000)
       })
  }

  userLogin(authData: AuthData) {
    this.store.dispatch({type : 'START_LOADING'})
    signInWithEmailAndPassword(this.fireAuth, authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading())
        this.authSuccessful();
        this.router.navigate(['/training']);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading())
         this.snackBarService.showSnackBar(error, null , 3000)
       })
  }

  logout() {
    this.store.dispatch(new UnAuthenticated())
  }


  private authSuccessful() {
    this.store.dispatch(new Authenticated())
  }
}
