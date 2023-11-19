import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMedicationComponent } from './add-medication.component';
import { SearchMedicationComponent } from './search-medication.component';
import { UpdateMedicationComponent } from './update-medication.component';
import { MedicationService } from './medication.service';
import { SigninComponent } from './users/signin.component';
import { SignupComponent } from './users/signup.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AddReviewComponent } from './add-review.component';
import { DisplayReviewsComponent } from './display-reviews.component';
import { UpdateReviewComponent } from './update-review.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DeleteMedicationComponent } from './delete-medication';
import { StarRatingModule, StarRatingConfigService } from 'angular-star-rating';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ShowMedicationDetailComponent } from './show-medication-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SigninComponent,
    SignupComponent,
    AddMedicationComponent,
    SearchMedicationComponent,
    UpdateMedicationComponent,
    AddReviewComponent,
    DisplayReviewsComponent,
    UpdateReviewComponent,
    DeleteMedicationComponent,
    ShowMedicationDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    StarRatingModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: SearchMedicationComponent },
      { path: 'users/signin', component: SigninComponent },
      { path: 'users/signup', component: SignupComponent },
      { path: 'medications', component: AddMedicationComponent },
      { path: 'medications/search', component: SearchMedicationComponent },
      { path: 'medications/updates', component: UpdateMedicationComponent },
      { path: 'medications/:medication_id/reviews', component: DisplayReviewsComponent },
      { path: 'medications/delete', component: DeleteMedicationComponent },
      { path: 'medications/:medication_id/reviews/add-review', component: AddReviewComponent },
      { path: 'medications/:medication_id/reviews/show-reviews', component: DisplayReviewsComponent },
      { path: 'medications/:medication_id/details', component: ShowMedicationDetailComponent },
      { path: 'medications/:medication_id/reviews/:review_id/edit', component: UpdateReviewComponent },
      // {path: 'medications/:medication_id/reviews/:review_id/delete',component: DeleteReviewComponent}

      {
        path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [() => inject(AuthService).isLoggedIn()]
      }
    ], { bindToComponentInputs: true }),
    BrowserAnimationsModule
  ],

  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
    AuthService,
    MedicationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
