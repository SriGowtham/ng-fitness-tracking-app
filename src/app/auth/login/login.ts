import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
    imports: [MatFormFieldModule,MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],

  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class LoginComponent {

  private authService = inject(AuthService)

 loginForm = new FormGroup({
  email: new FormControl('' , {validators: [Validators.required, Validators.email]}),
  password: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]})
 })

onSubmit(form:FormGroup){
  console.log(form)
  this.authService.userLogin({
    email: form.value.email,
    password: form.value.password
  })
}
}
