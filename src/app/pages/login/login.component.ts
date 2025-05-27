import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  navigateToSignup() {
    this.router.navigate(['signup']);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  login(): void {
    this.errorMessages = [];

    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);

      const controls = this.loginForm.controls;

      if (controls['email'].errors?.['required']) {
        this.errorMessages.push('Email is required.');
      } else if (controls['email'].errors?.['email']) {
        this.errorMessages.push('Invalid email format.');
      } else if (controls['password'].errors?.['required']) {
        this.errorMessages.push('Password is required.');
      }

      return;
    } else {
      const login: Login = this.loginForm.value;
      this.loginService.login(login).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
          localStorage.setItem('name', response.firstName);
          localStorage.setItem('isSeller', JSON.stringify(response.isSender)); // Store isSeller value
          this.router.navigate(['/homepage']);
        },
        (errorMessage: string) => {
          this.errorMessages.push(errorMessage);
        }
      );
    }
  }
}