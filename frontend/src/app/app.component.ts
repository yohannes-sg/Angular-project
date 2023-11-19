import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
 <app-homepage/>

  <div class="container mx-auto py-8">


      <!-- Medication Details / Reviews -->
      <div class="col-span-3">
        <app-display-reviews/>
      </div>
   </div>
 
  `,
  styles: []
})
export class AppComponent {

}