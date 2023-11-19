import { Component, Input, OnInit, inject } from '@angular/core';
import { Medication, MedicationService } from './medication.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-medication-detail',
  template: `
<div class="grid grid-cols-12 gap-8">
      <div class="col-span-7">
        <div class="grid grid-cols-1 gap-4">
          <div class="bg-white rounded shadow p-4">
            <h3 class="text-lg font-semibold mb-2"> {{ medication.name }} </h3>
            <p class="text-sm text-gray-600">Generic Id: {{ medication._id }}</p>
            <p class="text-sm text-gray-600">Generic Name: {{ medication.generic_name }}</p>
            <p class="text-sm text-gray-600">Medication Class: {{ medication.medication_class }}</p>
            <p class="text-sm text-gray-600">Availability:{{ medication.availability }} </p>
             <img [src]="imgUrl+medication.image._id" alt="medication.image.filename"> 
            <button (click)="toggleAddReview(medication._id)" class="mt-2 mr-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add review</button>
            <button [routerLink]="['', 'medications', medication._id, 'reviews', 'show-reviews']" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">show reviews</button>
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
export class ShowMedicationDetailComponent implements OnInit {
  @Input() medication_id: string = ''
  imgUrl: string = 'http://localhost:3000/medications/images/'
  #service = inject(MedicationService)
  showAddReview: boolean = false;
  medication!: Medication
  #router = inject(Router);
  #authService = inject(AuthService)
  #notification = inject(ToastrService)
  ngOnInit() {
    this.#service.get_medication_byId(this.medication_id).subscribe(response => {
      console.log(response)
      this.medication = response.data
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
