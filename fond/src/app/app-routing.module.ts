import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Modules/auth/components/login/login.component';
import { RegisterComponent } from './Modules/auth/components/register/register.component';
import { ProfileComponent } from './Modules/auth/components/profile/profile.component';
import { AuthGuard } from './Modules/auth/authguard.guard'; 
import {PolicyComponent} from 'src/app/Modules/policy/policy/policy.component'
import {AddPolicyComponent} from './Modules/policy/addpolicy/addpolicy.component'
import {QuestionnaireComponent} from './Modules/question/question/question.component'
import {QuestionListComponent} from './Modules/question/get-question/get-question.component'
import {ConfirmationComponent} from './Modules/user-response/confirmation/confirmation.component'
import {statistiquecomponent} from './Modules/question/statistique/statistique.component'
import {AcceilComponent} from './Modules/acceil/acceil.component'
import {HomeRedirectGuard} from './Modules/auth/home.guard'

const routes: Routes = [
  
  { path: '', component: AcceilComponent , canActivate: [AuthGuard ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'policy', component: PolicyComponent , canActivate: [AuthGuard] },
  { path: 'addpolicy', component: AddPolicyComponent , canActivate: [AuthGuard] },
  { path: 'ques', component: QuestionnaireComponent , canActivate: [AuthGuard]},
  { path: 'getques', component: QuestionListComponent , canActivate: [AuthGuard]},
  { path: 'confirm', component: ConfirmationComponent , canActivate: [AuthGuard]},
  { path: 'stat', component: statistiquecomponent , canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }