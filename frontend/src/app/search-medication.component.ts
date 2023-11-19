import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Medication, MedicationService } from './medication.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-search-medication',
  template: `
  <div class="container mx-auto py-8">
  <!-- Browse Medications -->
  <div class="bg-white p-4 rounded shadow mb-8">
    <h3 class="text-lg font-semibold mb-4">Browse Medications</h3>
    <!-- Display letters A-Z -->
    <!-- When clicked, fetch medications starting with that letter -->
    <ul class="flex flex-wrap">
      <!-- Loop through each letter from A to Z -->
      <ng-container *ngFor="let letter of alphabet">
        <li class="mr-2 mb-2">
          <!-- Create links for each letter -->
          <a (click)=searchLetter(letter) class="border border-gray-300 px-2 py-1 rounded hover:bg-gray-200" >{{ letter }}</a>
        </li>
      </ng-container>
    </ul>
  </div>
</div>

<div class="grid grid-cols-12 gap-8">
      <div class="col-span-7">
        <div class="grid grid-cols-1 gap-4">
          <div *ngFor="let medication of data " class="bg-white rounded shadow p-4">
          <a [routerLink]="['', 'medications', medication._id, 'details']" class="text-lg font-semibold mb-2 text-green-500 hover:text-pink-500">{{ medication.name }}</a><br/>
             <button (click)="toggleAddReview(medication._id)" class="mt-2 mr-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add review</button>
            <button [routerLink]="['','medications', medication._id, 'reviews', 'show-reviews']" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">show reviews</button>
          </div>
        </div>
      </div>
      <div class="col-span-3" *ngIf="showAddReview">
        <app-add-review></app-add-review>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class SearchMedicationComponent {
  imageData: any
  #notification = inject(ToastrService)
  #service = inject(MedicationService)
  form = inject(FormBuilder).nonNullable.group({
    first_letter: ''
  });
  data: Medication[] = []
  #router = inject(Router);
  #authService = inject(AuthService)
  alphabet: string[] = [];
  showAddReview: boolean = false;
  constructor() {
    // Populate the alphabet array with letters A to Z
    for (let i = 65; i <= 90; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
  }

  searchLetter(letter: string) {
    this.#service.get_medications_byLetter('A').subscribe(response => {
      if (response.data.length > 0) {
        this.data = this.data = response.data; // Clear the data array
      }
    });
    this.#service.get_medications_byLetter(letter).subscribe(response => {
      if (response.data.length > 0) {
        this.data = response.data;
      }
      else
        this.#notification.error("no medication with that letter, please try other letter")
    });
  }
  toggleAddReview(mid: string) {
    this.showAddReview = true;
    if (!this.#authService.state_signal().jwt) {
      this.#notification.error('please login first')
      this.#router.navigate(['', 'users', 'signin'])
    }
    else
      this.#router.navigate(['', 'medications', mid, 'reviews', 'add-review'])
  }

  add_medication_review(medication_id: string) {
    this.#router.navigate(['medications', medication_id, 'add-review']);
  }
  show_reviews(medication_id: string) {
    this.#router.navigate(['medications', medication_id, 'reviews']);

  }
}
