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
  loginFailed: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  navigateToSignup(){
    this.router.navigate(['signup']);
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginFailed = true;
      return;
    }

    const login: Login = this.loginForm.value;
    this.loginService.login(login);
    this.loginFailed = false;
  }
}