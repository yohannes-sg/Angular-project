import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
export type Review =
  {
    _id: string
    review: string, rating: number,
    by: { user_id: string, fullname: string },
    date: number
  }
// POST /medications/:medication_id/reviews
export type ADD_REVIEWS_REQUEST = { "review": string, "rating": string }
export type ADD_REVIEWS_RESPONSE = { "success": boolean, "data": string } // review_id

// GET /medications/:medication_id/reviews
export type GET_REVIEWS = { "success": boolean, "data": Review[] } // only name

// PUT /medications/:medication_id/reviews/:review_id
export type EDIT_REVIEW_REQUEST = { "review": string, "rating": string }
export type EDIT_REVIEW_RESPONSE = { "success": boolean, "data": boolean }

// GET /medications/:medication_id/reviews/:review_id
export type GET_REVIEW = { "success": boolean, "data": Review }

// DELETE /medications/:medication_id/reviews/:review_id
export type DELETE_REVIEW_RESONSE = { "success": boolean, "data": boolean }

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  #http = inject(HttpClient)

  #baseUrl = 'http://localhost:3000'; // Base URL of your backend API

  add_Reviews(medication_id: string, review: ADD_REVIEWS_REQUEST) {
    return this.#http.post<ADD_REVIEWS_RESPONSE>(this.#baseUrl + `/medications/${medication_id}/reviews`, review);
  }

  // Get medication reviews
  get_medication_reviews(medicationId: string) {
    return this.#http.get<GET_REVIEWS>(`${this.#baseUrl}/medications/${medicationId}/reviews`);;
    // }
  }

  // Get medication review by ID
  get_medication_reviewById(medicationId: string, reviewId: string) {
    return this.#http.get<GET_REVIEW>(`${this.#baseUrl}/medications/${medicationId}/reviews/${reviewId}`);
  }

  delete_Review_By_Id(medication_id: string, review_id: string) {
    return this.#http.delete<DELETE_REVIEW_RESONSE>(this.#baseUrl + `/medications/${medication_id}/reviews/${review_id}`);
  }
  update_Reviews_By_Id(medication_id: string, review_id: string, review: EDIT_REVIEW_REQUEST) {
    return this.#http.put<EDIT_REVIEW_RESPONSE>(this.#baseUrl + `/medications/${medication_id}/reviews/${review_id}`, review);
  }
}
