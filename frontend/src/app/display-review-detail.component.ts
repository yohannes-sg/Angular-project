import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GET_REVIEW, Review, ReviewService } from './review.service';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-review-details',
  template: `
<div *ngIf="review">
  <h2>Review Details</h2>
  <p><strong>Review:</strong> {{ review.review }}</p>
  <p><strong>Rating:</strong> {{ review.rating }}</p>
  <p><strong>By:</strong> {{ review.by.fullname }}</p>
  <p><strong>Date:</strong> {{ formattedDate }}</p>
  <button (click)="update_review( review._id)"> Add Review </button>
    <button (click)="delete_review( review._id)"> delete Review </button>
</div>
<div *ngIf="!review">
  <p>Loading...</p>
</div>
  `,
  styles: []
})
export class DisplayReviewDetailsComponent implements OnInit {
  reviewId!: string;
  @Input() medication_id!: string;
  #notification = inject(ToastrService)
  review!: Review;
  #reviewService = inject(ReviewService)
  #router = inject(Router)
  #authService = inject(AuthService)
  #datePipe = inject(DatePipe)
  formattedDate: string | null = null; // Allow null values
  ngOnInit(): void {
    //...
    this.#reviewService.get_medication_reviewById(this.medication_id, this.reviewId)
      .subscribe((data: GET_REVIEW) => {
        this.review = data.data;
        const formatted = this.#datePipe.transform(this.review.date, 'short');
        this.formattedDate = formatted !== null ? formatted : ''; // Assign an empty string if formatted is null
      }, error => {
        this.#notification.error('Error fetching review details')
      });
  }
  update_review(reviewId: string) {
    this.#router.navigate(['', 'medications', this.medication_id, '/reviews', reviewId]);
  }
  delete_review(reviewId: string) {
    if(this.#authService.state_signal()){
    this.#reviewService.delete_Review_By_Id(this.medication_id, reviewId).subscribe(response => {
      if (response) {
        this.#notification.error('your review deleted successfully!')
      }
      else
        this.#notification.warning("please try again")
    })
  }
  else
        this.#notification.warning("signin first")
}
}
