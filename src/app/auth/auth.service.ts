import { inject, Injectable } from '@angular/core';
import { User } from './modal/user.modal';
import { AuthData } from './modal/auth-data.modal';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  private router = inject(Router);
  private fireAuth = inject(Auth);
  authDone = new Subject<boolean>();
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
        throw new Error(error);
      });
  }

  userLogin(authData: AuthData) {
    signInWithEmailAndPassword(this.fireAuth, authData.email, authData.password)
      .then(() => {
        this.authSuccessful();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getUser() {
    return { ...this.user };
  }

  logout() {
    this.user = null;
    this.authDone.next(false);
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessful() {
    this.authDone.next(true);
    this.router.navigate(['/training']);
  }
}
