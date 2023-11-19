import { Component, inject } from '@angular/core';
import { AuthService, JWT, SIGNIN_REQUEST, SIGNIN_RESPONSE } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  template: `

<div class="flex justify-center items-center h-screen bg-gray-100">
  <div class="w-3/4 lg:w-2/4 xl:w-1/3 bg-white p-10 rounded-lg shadow-md">
    <h2 class="text-3xl font-semibold mb-8 text-center">Sign In</h2>
    <form [formGroup]="form" (ngSubmit)="login()">
      <div class="mb-6">
        <label for="email" class="block mb-2 text-lg font-medium text-gray-700">Your email</label>
        <input formControlName="email" type="email" id="email" class="input-style" placeholder="Email" required>
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-lg font-medium text-gray-700">Your password</label>
        <input formControlName="password" type="password" id="password" class="input-style" placeholder="Password" required>
      </div>
      <button type="submit" [disabled]="!form.valid" class="button-style">Sign In</button>
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

export class SigninComponent {
  #authService = inject(AuthService)
  #router = inject(Router)
  #notification = inject(ToastrService)
  form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login() {
    if (this.form.valid) {
      this.#authService.login(this.form.value as SIGNIN_REQUEST).subscribe(
        (response: SIGNIN_RESPONSE) => {
          const decoded = jwtDecode(response.data) as JWT;
          const state = { ...decoded, jwt: response.data };
          this.#authService.state_signal.set(state);
          localStorage.setItem('StateTODO', JSON.stringify(state));
          if (response) this.#router.navigate(['', 'homepage']);
          this.#notification.success('Login successfully!')
        },
        (error) => {
          this.#notification.error('Login Error')
        }
      );
    } else {
      this.#notification.warning('Please fill in all the required fields correctly.')
    }
    this.form.reset()
  }
}