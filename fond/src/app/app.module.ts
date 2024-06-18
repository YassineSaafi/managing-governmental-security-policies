import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './Modules/auth/auth.module'
import { HttpClientModule } from '@angular/common/http';
import {PolicyModule} from './Modules/policy/policy.module';
import {QuestionModule} from './Modules/question/question.module';
import { RouterModule } from '@angular/router'; 
import {AcceilComponent} from './Modules/acceil/acceil.component'
import {UserResponseModule} from './Modules/user-response/user-response.module'
import {AuthInterceptor} from './Modules/auth/authinterceptor.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent ,

    AcceilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ReactiveFormsModule ,
    HttpClientModule ,
   AuthModule ,
    PolicyModule ,
    RouterModule,
    QuestionModule ,
    UserResponseModule
  

  ],
  providers: [
    AuthInterceptor, // Ajoutez l'intercepteur aux fournisseurs
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }