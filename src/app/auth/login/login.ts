import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinner,
  ],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  isLoggedIn$: Observable<boolean>;
  private authService = inject(AuthService);
  private store = inject(Store<fromRoot.State>)

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  onSubmit(form: FormGroup) {
   
    this.isLoggedIn$ = this.store.select(fromRoot.getIsLoading)
    this.authService.userLogin({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
