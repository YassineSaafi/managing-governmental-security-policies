import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyComponent } from './policy/policy.component';
import { AddPolicyComponent } from './addpolicy/addpolicy.component';
import { ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [PolicyComponent, AddPolicyComponent],
  imports: [
    CommonModule ,
    ReactiveFormsModule
  ]
})
export class PolicyModule { }
