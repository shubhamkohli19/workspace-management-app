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
  errorMessages: string[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {
    this.postUsers = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  onPhoneNumberInput(event: any) {
    const input = String.fromCharCode(event.keyCode);
    if (!/^\d+$/.test(input)) {
      event.preventDefault();
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  signupUser() {
    this.errorMessages = [];

    if (this.postUsers.invalid) {
      this.markFormGroupTouched(this.postUsers);

      const controls = this.postUsers.controls;

      if (controls['firstName'].errors?.['required']) {
        this.errorMessages.push('First Name is required.');
      }
      else if (controls['lastName'].errors?.['required']) {
        this.errorMessages.push('Last Name is required.');
      }
      else if (controls['phoneNumber'].errors?.['required']) {
        this.errorMessages.push('Phone Number is required.');
      } else if (controls['phoneNumber'].errors?.['pattern']) {
        this.errorMessages.push('Phone Number must be 10 digits.');
      }
      else if (controls['email'].errors?.['required']) {
        this.errorMessages.push('Email is required.');
      } else if (controls['email'].errors?.['email']) {
        this.errorMessages.push('Invalid email format.');
      }
      else if (controls['password'].errors?.['required']) {
        this.errorMessages.push('Password is required.');
      } else if (controls['password'].errors?.['minlength']) {
        this.errorMessages.push('Password must be at least 8 characters.');
      }
      else if (controls['confirmPassword'].errors?.['required']) {
        this.errorMessages.push('Confirm Password is required.');
      }

      return;
    }

    else {
      if (this.postUsers.get('password')?.value !== this.postUsers.get('confirmPassword')?.value) {
        this.errorMessages.push('Passwords do not match.');

        return;
      }

      var req: any = {
        id: this.postUsers.get('id')?.value,
        firstName: this.postUsers.get('firstName')?.value,
        lastName: this.postUsers.get('lastName')?.value,
        email: this.postUsers.get('email')?.value,
        phoneNumber: this.postUsers.get('phoneNumber')?.value,
        password: this.postUsers.get('password')?.value
      }

      this.signupService.signupUser(req).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['homepage']);
        },
        (error: any) => {
          if (error.status == 409) {
            this.errorMessages.push('Email already exists.');
          } else {
            console.log(req);
            this.errorMessages.push('An error occurred. Please try again.');
          }
        }
      );
    }
  }
}