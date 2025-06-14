import { inject, Injectable } from '@angular/core';
import { User } from './modal/user.modal';
import { AuthData } from './modal/auth-data.modal';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user : User;
  private router = inject(Router)
  authDone = new Subject<boolean>()
  constructor() { }

  userRegister(authData: AuthData){
    this.user = {
        email: authData.email,
        userId: Math.round(Math.random() * 100).toString()
    }
    this.authSuccessful()
  }

  userLogin(authData: AuthData){
    this.user = {
        email: authData.email,
        userId: Math.round(Math.random() * 100).toString()
    }
    this.authSuccessful()
  }

  getUser(){
    return {...this.user}
  }

  logout(){
    this.user = null;
    this.authDone.next(false)
  }

  isAuth(){
    return this.user != null
  }

  private authSuccessful(){
    this.authDone.next(true)
    this.router.navigate(['/training'])
  }
}
