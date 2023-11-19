import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService, EDIT_REVIEW_REQUEST, GET_REVIEW } from './review.service';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-review',
  template: `
<div>
      <form [formGroup]="editReviewForm" (ngSubmit)="onSubmit()" class="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <div class="mb-4">
  <label for="editRating" class="block text-gray-700 font-bold mb-2">Review:</label>
  <textarea formControlName="editReview" id="name" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" rows="6"></textarea>
</div>

        <div class="mb-4">
          <label for="editRating" class="block text-gray-700 font-bold mb-2">Ratings:</label>
          <input type="number" formControlName="editRating" min="1" max="5" id="generic_name" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
        </div>
        <div class="flex justify-end">
          <button type="submit" [disabled]="editReviewForm.invalid" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">Update</button>
        </div>
      </form>
    </div>
  `

  ,
  styles: []
})
export class UpdateReviewComponent implements OnInit {
  editReviewForm!: FormGroup;
  @Input() review_id!: string;
  @Input() medication_id!: string;
  #authService = inject(AuthService)
  #fb = inject(FormBuilder)
  #reviewService = inject(ReviewService)
  #notification = inject(ToastrService)

  ngOnInit() {
    this.createEditReviewForm();
    this.getReviewDetails();
  }

  createEditReviewForm() {
    this.editReviewForm = this.#fb.group({
      editReview: ['', [Validators.required]],
      editRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  getReviewDetails() {
    this.#reviewService.get_medication_reviewById(this.medication_id, this.review_id)
      .subscribe((response: GET_REVIEW) => {
        console.log(response.data)
        this.editReviewForm.patchValue({
          editReview: response.data.review,
          editRating: response.data.rating
        });
      });
  }

  onSubmit() {
    const token = this.#authService.state_signal();
    if (token) {
      const updatedReview: EDIT_REVIEW_REQUEST = {
        review: this.editReviewForm.value.editReview,
        rating: this.editReviewForm.value.editRating
      };
      this.#reviewService.update_Reviews_By_Id(this.medication_id, this.review_id, updatedReview)
        .subscribe((response) => {
          this.#notification.success('Review updated successfully')
        },
          (error) => {
            this.#notification.error('Failed to update Review. Please try again.')
          }
        );
    } else {
      this.#notification.error('please signin first')
    }
  }
}

