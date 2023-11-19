import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,  RouterModule.forChild([

      {path:'', redirectTo:'signin',pathMatch:'full'},
      {path:'signin', component:SigninComponent},
      {path: 'signup', component: SignupComponent}

    ])
  ]
})
export class UsersModule { }
