import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConfirmationComponent],
  imports: [
    CommonModule ,
    FormsModule
  ]
})
export class UserResponseModule { }
