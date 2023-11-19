import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-homepage',
  template: `
<nav class="bg-blue-500 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <a [routerLink]="['']" class="text-white text-2xl font-bold">Medication Reviews</a>
    <ul class="flex space-x-4">
      <li><a [routerLink]="['']" class="text-white hover:underline">Home</a></li>
      <li class="relative" #menu>
        <a href="#" class="text-white hover:underline" (click)="toggleDropdown($event)">
          Medications
        </a>

        <ul id="submenu" class="absolute z-10 hidden bg-white border rounded-md mt-2 py-1 shadow-md text-blue-500" #submenu>
          <li><a [routerLink]="['', 'medications']" class="block px-4 py-2" (click)="toggleDropdown($event)" >Add Medication</a></li>
          <li><a [routerLink]="['', 'medications','updates']" class="block px-4 py-2" (click)="toggleDropdown($event)">Edit Medication</a></li>
          <li><a [routerLink]="['', 'medications', 'delete']" class="block px-4 py-2" (click)="toggleDropdown($event)">Delete Medication</a></li>
        </ul>
      </li>
      <ng-container *ngIf="!authService.isLoggedIn(); else signedIn">
        <li><a [routerLink]="['', 'users','signin']" class="text-white hover:underline">Sign In</a></li>
        <li><a [routerLink]="['', 'users','signup']" class="text-white hover:underline">Sign Up</a></li>
      </ng-container>
      <ng-template #signedIn>
        <li><a class="text-white hover:underline" (click)="signout()">
          Sign Out 
        </a></li>
        <span style="color:orange">welcome {{authService.state_signal().fullname}}</span>
      </ng-template>
    </ul>
  </div>
</nav>
  <router-outlet/>
   <!-- Footer -->
   <footer class="bg-gray-200 text-center py-4 fixed w-full bottom-0 z-40">
  <p>&copy; 2023 Medication Reviews. All rights reserved.</p>
</footer>
  `,
  styles: [
    `  `
  ]
})
export class HomepageComponent {
  authService = inject(AuthService)
  @ViewChild('submenu') submenu!: ElementRef;
  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.submenu.nativeElement.classList.toggle('hidden');
  }
  signout() {
    this.authService.state_signal.set({ _id: '', fullname: '', email: '', jwt: '' })
    localStorage.clear
  }
}
