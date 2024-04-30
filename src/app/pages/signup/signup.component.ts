import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  users: string[] = [];
  postUsers: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ){
    this.postUsers = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { notSame: true };
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

  confirmPassword = '';
  passwordsDoNotMatch = false;

  public signupUser() {
    var req: any = {
      id: this.postUsers.get('id')?.value,
      firstName: this.postUsers.get('firstName')?.value,
      lastName: this.postUsers.get('lastName')?.value,
      email: this.postUsers.get('email')?.value,
      phoneNumber: this.postUsers.get('phoneNumber')?.value,
      password: this.postUsers.get('password')?.value
    }
    this.signupService.signupUser(req).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['homepage']);
        
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
