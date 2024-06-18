import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './question/question.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { QuestionListComponent} from './get-question/get-question.component';
import { statistiquecomponent} from './statistique/statistique.component';


@NgModule({
  declarations: [QuestionnaireComponent, QuestionListComponent, statistiquecomponent],
  imports: [
    CommonModule ,
    FormsModule ,
    ReactiveFormsModule
  ]
})
export class QuestionModule { }
