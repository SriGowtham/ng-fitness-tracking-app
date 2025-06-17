import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SpinnerService } from '../../shared/spinner.service.ts';

@Component({
  selector: 'app-login',
    imports: [MatFormFieldModule,MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule , MatProgressSpinner],

  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class LoginComponent {


 isLoggedIn = false;
 private authService = inject(AuthService)
 private spinnerService = inject(SpinnerService)

 loginForm = new FormGroup({
  email: new FormControl('' , {validators: [Validators.required, Validators.email]}),
  password: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]})
 })

onSubmit(form:FormGroup){
  this.spinnerService.loadingState.subscribe((val) => {
    this.isLoggedIn = val
  })
  this.authService.userLogin({
    email: form.value.email,
    password: form.value.password
  })
}
}
