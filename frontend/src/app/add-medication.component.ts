import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ADD_MEDICATION_REQUEST, Medication, MedicationService } from './medication.service';
import { Router } from '@angular/router';
import { AuthService, JWT } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-medication',
  template: `
<form [formGroup]="form" (ngSubmit)="go()" class="max-w-md mx-auto p-6 bg-white rounded shadow-md">
  <div class="mb-4">
    <label for="name" class="block text-gray-700 font-bold mb-2">Name:</label>
    <input type="text" formControlName="name" id="name" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
  </div>
  <div class="mb-4">
    <label for="generic_name" class="block text-gray-700 font-bold mb-2">Generic Name:</label>
    <input type="text" formControlName="generic_name" id="generic_name" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
  </div>
  <div class="mb-4">
    <label for="medication_class" class="block text-gray-700 font-bold mb-2">Medication Class:</label>
    <input type="text" formControlName="medication_class" id="medication_class" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
  </div>
  <div class="mb-4">
    <label for="availability" class="block text-gray-700 font-bold mb-2">Availability:</label>
    <input type="text" formControlName="availability" id="availability" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
  </div>
  <div class="mb-4">
    <label for="image" class="block text-gray-700 font-bold mb-2">Upload Image:</label>
    <input type="file" id="image" (change)="onFileSelected($event)" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
  </div>
  <div class="flex justify-end">
    <button type="submit" [disabled]="!form.valid" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">Submit</button>
  </div>
</form>

  `,
  styles: []
})
export class AddMedicationComponent {
  form: FormGroup;
  #notification = inject(ToastrService)
  selectedImage: File | null = null;
  formBuilder = inject(FormBuilder)
  #medicationService = inject(MedicationService)
  #authService = inject(AuthService)
  constructor() {
    this.form = this.formBuilder.group({
      name: '',
      generic_name: '',
      medication_class: '',
      availability: ''
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  go() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')!.value);
    formData.append('generic_name', this.form.get('generic_name')!.value);
    formData.append('medication_class', this.form.get('medication_class')!.value);
    formData.append('availability', this.form.get('availability')!.value);

    if (this.selectedImage) {
      formData.append('medication_image', this.selectedImage, this.selectedImage.name);
    }

    const token = this.#authService.state_signal(); // Assuming authService has state_signal property containing JWT
    if (token) {
      this.#medicationService.add_medication(formData)
        .subscribe(
          response => {
            this.#notification.success('Medication added successfully')
            // Reset the form or perform any other actions upon successful submission
            this.form.reset();
          },
          error => {
            this.#notification.error('Error occurred while adding medication')
          }
        );
    } else {
      this.#notification.error('please login first')
    }
  }
}
