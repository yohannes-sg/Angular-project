
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Medication, MedicationService } from './medication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-medication',
  template: `
    <div *ngIf="!signal" class="flex justify-center mt-4">
  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-4">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Search Medication</h2>

    <div class="mb-4">
      <label for="medicationId" class="block text-sm font-medium text-gray-700">enter Medication ID</label>
      <input type="text" id="medicationId" placeholder="Enter Medication ID" [(ngModel)]="medicationId"
             class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500"
             [(ngModel)]="medicationId">
    </div>

    <button class="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-sky-400 focus:outline-none focus:shadow-md"
    (click)="update()">
      Search Medication
    </button>
  </div>
</div>

<div *ngIf="signal">
    <form [formGroup]="form" (ngSubmit)="updateMedication()" class="max-w-md mx-auto p-6 bg-white rounded shadow-md">
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
     <input type="file" id="image" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
   </div>
      <div class="flex justify-end">
        <button type="submit" [disabled]="!form.valid" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">Update</button>
      </div>
    </form>
    </div>
  `,
  styles: []
})
export class UpdateMedicationComponent {
  form: FormGroup;
  medicationId!: string;
  router = inject(Router)
  signal: boolean = false;
  #notification = inject(ToastrService)
  selectedImage: File | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private medicationService: MedicationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: '',
      generic_name: '',
      medication_class: '',
      availability: ''
    });
  }
  update() {
    this.medicationService.get_medication_byId(this.medicationId).subscribe(
      (respones) => {
        this.form.patchValue({
          name: respones.data.name,
          generic_name: respones.data.generic_name,
          medication_class: respones.data.medication_class,
          availability: respones.data.availability
        });
        this.signal = true;
      },
      error => {
        this.#notification.error('Error occurred while fetching medication details')
      }
    );
  }

  updateMedication() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')!.value);
    formData.append('generic_name', this.form.get('generic_name')!.value);
    formData.append('medication_class', this.form.get('medication_class')!.value);
    formData.append('availability', this.form.get('availability')!.value);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }
    // Add other form data to formData as needed

    const token = this.authService.state_signal();
    if (token) {
      this.medicationService.update_medication_byId(this.medicationId, formData)
        .subscribe(
          (response) => {
            this.#notification.success('Medication updated successfully')
          },
          (error) => {
            this.#notification.error('please login first')
            this.router.navigate(['', 'users', 'signin'])
          }
        );
    } else {
      this.#notification.error('please login first')
    }
  }
}
