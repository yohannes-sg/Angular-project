import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, JWT } from './auth.service';

export type User = { _id: string, fullname: string, email: string, password: string }
export type Image = { filename: string, originalname: string, _id: any }
export type Review = { review: string, rating: number, by: { user_id: string, fullname: string }, date: number }
export type Owner = { user_id: string, fullname: string, email: string }
export type Medication = {
  _id: string
  name: string,
  first_letter: string,
  generic_name: string,
  medication_class: string,
  availability: string,
  image: any,
  added_by: Owner,
  reviews: Review[]
}
export type GET_MEDICATIONS_RESPONSE = { success: boolean, data: Medication[] }
export type GET_MEDICATION_RESPONSE = { success: boolean, data: Medication }
export type ADD_MEDICATION_REQUEST = {
  name: string;
  generic_name: string;
  medication_class: string;
  availability: string;
  image: File;
}
export type ADD_MEDICATION_RESPONSE = { success: boolean, data: Medication }

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  #http = inject(HttpClient)
  #baseUrl = 'http://localhost:3000'; // Base URL of your backend API


  add_medication(medicationData: any) {
    return this.#http.post<ADD_MEDICATION_RESPONSE>(`${this.#baseUrl}/medications`,
      medicationData
    );
  }

  // Get medication by ID
  get_medication_byId(medicationId: string) {
    return this.#http.get<GET_MEDICATION_RESPONSE>(`${this.#baseUrl}/medications/${medicationId}`);
  }

  // Get medications by letter
  get_medications_byLetter(letter: string) {
    return this.#http.get<GET_MEDICATIONS_RESPONSE>(`${this.#baseUrl}/medications?first_letter=${letter}`);
  }

  // Get medication images
  get_medication_images(imageId: string) {
    return this.#http.get<Image[]>(`${this.#baseUrl}/medications/images/${imageId}`);
  }

  // Delete medication by ID
  delete_medication_byId(medicationId: string) {
    return this.#http.delete<GET_MEDICATION_RESPONSE>(`${this.#baseUrl}/medications/${medicationId}`);
  }

  // Update medication by ID
  update_medication_byId(medicationId: string, updatedMedication: any) {
    return this.#http.put<GET_MEDICATION_RESPONSE>(`${this.#baseUrl}/medications/${medicationId}`, updatedMedication);
  }
}