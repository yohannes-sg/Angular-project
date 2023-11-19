import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, SIGNUP_REQUEST } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  template: `  

<div class="flex justify-center items-center h-screen bg-gray-100">
  <div class="w-3/4 lg:w-2/4 xl:w-1/3 bg-white p-10 rounded-lg shadow-md">
    <h2 class="text-3xl font-semibold mb-8 text-center">Sign Up</h2>
    <form [formGroup]="signupForm" (ngSubmit)="signup()">
      <div class="mb-6">
        <label for="fullname" class="block mb-2 text-lg font-medium text-gray-700">Your fullname</label>
        <input formControlName="fullname" type="text" id="fullname" class="input-style" placeholder="Full Name" required>
      </div>
      <div class="mb-6">
        <label for="email" class="block mb-2 text-lg font-medium text-gray-700">Your email</label>
        <input formControlName="email" type="email" id="email" class="input-style" placeholder="Email" required>
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-lg font-medium text-gray-700">Your password</label>
        <input formControlName="password" type="password" id="password" class="input-style" placeholder="Password" required>
      </div>
      <button type="submit" [disabled]="!signupForm.valid" class="button-style">Sign Up</button>
    </form>
  </div>
</div>
  `,
  styles: [`
  .input-style {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    /* Additional input styles */
  }

  .button-style {
    width: 100%;
    padding: 0.7rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.25rem;
    cursor: pointer;
    /* Additional button styles */
  }

  .button-style:hover {
    background-color: #1e4bb1;
  }
  `]
})
export class SignupComponent {
  #notification = inject(ToastrService)
  formBuilder = inject(FormBuilder)
  #authService = inject(AuthService)
  #router = inject(Router)
  signupForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });


  signup() {
    if (this.signupForm.valid) {
      this.#authService.signup(this.signupForm.value as SIGNUP_REQUEST).subscribe(
        (response) => {
          if (response) {
            this.#notification.success("signup successfully")
            this.#router.navigate(['', 'users', 'signin']);
          }
        },
        (error) => {
         // this.#notification.warning('Please fill in all the required fields correctly.')
        }
      );
    } 
    this.signupForm.reset()
  }
}