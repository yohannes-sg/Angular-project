import { Component, Input, OnInit, inject } from '@angular/core';
import { ReviewService, ADD_REVIEWS_REQUEST } from './review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  template: `
  <div class="flex justify-center items-center h-screen bg-gray-100">
  <div class="w-3/4 lg:w-2/4 xl:w-1/3 bg-white p-10 rounded-lg shadow-md">
<h2 class="text-lg font-semibold text-gray-700 mb-4">Add Review</h2>
          <div>
      <form [formGroup]="reviewForm" (ngSubmit)="go()" class="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <div class="mb-4">
          <label for="editRating" class="block text-gray-700 font-bold mb-2">Review:</label>
          <textarea formControlName="review" id="name" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <div class="mb-4">
          <label for="editRating" class="block text-gray-700 font-bold mb-2">Ratings:</label>
          <input type="number" formControlName="rating" min="1" max="5" id="generic_name" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
        </div>
        <div class="flex justify-end">
          <button type="submit"  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">Add Review</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  `,
  styles: []
})
export class AddReviewComponent {
  @Input() medication_id!: string
  #notification = inject(ToastrService)
  reviewForm = inject(FormBuilder).nonNullable.group({
    review: '',
    rating: ''
  });
  #reviewService = inject(ReviewService)
  #authService = inject(AuthService)
  #router =inject(Router)

  go() {
    const token = this.#authService.state_signal();
    if (token) {
      this.#reviewService.add_Reviews(this.medication_id, this.reviewForm.value as ADD_REVIEWS_REQUEST)
        .subscribe(
          response => {
            this.#notification.success('Review added successfully')
            this.reviewForm.reset();
            this.#router.navigate([''])
          },
          error => {
            this.#notification.error('Error occurred while adding review')
          }
        );
    } else {
      this.#notification.error('please login first')
    }
  }
}
