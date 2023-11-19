import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationService } from './medication.service';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-medication',
  template: `
    <div class="flex justify-center mt-4">
  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-4">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Delete Medication</h2>

    <div class="mb-4">
      <label for="medicationId" class="block text-sm font-medium text-gray-700">Medication ID</label>
      <input type="text" id="medicationId" placeholder="Enter Medication ID"
             class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500"
             [(ngModel)]="medicationId">
    </div>

    <button class="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-sky-400 focus:outline-none focus:shadow-md"
            (click)="delete()">
      Delete Medication
    </button>
  </div>
</div>
  `
})
export class DeleteMedicationComponent {
  medicationId: string;
  #authService = inject(AuthService)
  #medicationService = inject(MedicationService)
  #notification = inject(ToastrService)
  constructor(
    private router: Router
  ) {
    this.medicationId = '';
  }

delete() {
      this.#medicationService.delete_medication_byId(this.medicationId).subscribe(response => {
        if (response.data){
        this.#notification.success("deleted successfully")
        }
        else{
        this.#notification.error("no medication with this id")
        }
      });
    } 
  }
