import { Component, Input, OnInit, inject } from '@angular/core';
import { ReviewService, GET_REVIEWS, Review } from './review.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-reviews',
  template: `
    <!-- Display reviews -->
    <div *ngFor="let review of reviews" class="bg-gray-200 border p-4 mb-6">
    <div class="flex items-center mb-2">
            <div class="mr-3">
                <span class="font-semibold">Reviewer Name:</span>
                <span class="text-gray-700">{{ review.by.fullname }}</span>
            </div>
            
            <div class="flex items-center">
                <span class="font-semibold">Rating:</span>
                <span class="ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 0l2.45 6.355L18 7.29l-4.89 4.005L15.65 20 10 16.775 4.35 20l1.54-8.705L2 7.29l5.55-.935L10 0zm0 2.222L7.89 7.11H1.112L5.99 11.11l-1.477 8.344L10 14.812l5.488 4.642-1.477-8.344L18.888 7.11H12.11L10 2.222z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="ml-1">{{ review.rating }}/5</span>
            </div>
        </div>
        <div class="mb-2">
            <p class="text-gray-800">{{ review.review }}</p>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Review Date: {{ review.date | date }}</span>
            <div class="flex items-center space-x-2">
                <button class="flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.142 2.702 7.658 6.435 8.898.405.152.678-.485.678-1.057v-3.834C4.895 15.16 3 12.932 3 10c0-3.866 3.134-7 7-7s7 3.134 7 7c0 2.932-1.895 5.16-4.113 6.007.065.17.113.354.113.558v3.834c0 .572.273 1.209.678 1.057C17.298 17.658 20 14.142 20 10c0-5.523-4.477-10-10-10z" clip-rule="evenodd"/>
                    </svg>
                    <span class="ml-1">Like</span>
                    <span class="ml-1">(<span id="likeCount1">0</span>)</span>
                </button>
                <button class="flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.142 2.702 7.658 6.435 8.898.405.152.678-.485.678-1.057v-3.834C4.895 15.16 3 12.932 3 10c0-3.866 3.134-7 7-7s7 3.134 7 7c0 2.932-1.895 5.16-4.113 6.007.065.17.113.354.113.558v3.834c0 .572.273 1.209.678 1.057C17.298 17.658 20 14.142 20 10c0-5.523-4.477-10-10-10z" clip-rule="evenodd"/>
                    </svg>
                    <span class="ml-1">Dislike</span>
                    <span class="ml-1">(<span id="dislikeCount1">0</span>)</span>
                </button>
            </div>
        </div>
        <div *ngIf="isReviewAuthor(review)" class="flex items-center justify-end mt-2">
            <button (click)="editReview(review._id)" class="text-blue-500 mr-2">Edit</button>
            <button (click)="deleteReview(review)" class="text-red-500">Delete</button>
        </div>
    </div>
  `,
  styles: []
})
export class DisplayReviewsComponent implements OnInit {
  reviews: Review[] = [];
  @Input() medication_id!: string;
  #authService = inject(AuthService)
  #router = inject(Router)
  #reviewService = inject(ReviewService)
  #notification = inject(ToastrService)

  ngOnInit() {
    this.#reviewService.get_medication_reviews(this.medication_id)
      .subscribe((response: GET_REVIEWS) => {
        this.reviews = response.data;
      });
  }

  isReviewAuthor(review: Review): boolean {
    const loggedInUser = this.#authService.state_signal();
    return review.by.user_id === loggedInUser._id;
  }

  editReview(reviewId: string) {
    console.log(reviewId)
    this.#router.navigate(['', 'medications', this.medication_id, 'reviews', reviewId, 'edit']);
  }

  deleteReview(review: Review) { 
      this.#reviewService.delete_Review_By_Id(this.medication_id, review._id).subscribe(response => {
        if (response){
        const index = this.reviews.indexOf(review);
        if (index !== -1) {
          this.reviews.splice(index, 1); 
          this.#notification.success('Review deleted successfully!');
        } 
      }
        else this.#notification.error("please try again")
      });
    }
  }