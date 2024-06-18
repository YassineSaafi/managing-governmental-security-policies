import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserResponse } from '../../user-response/user-response';
import {QuestionService} from '../question.service'
import { QuestionInterface } from '../question-interface';
import { AuthService } from '../../auth/auth.service';
import { UserResponseService } from '../../user-response/user-response.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class statistiquecomponent {
  questions: QuestionInterface[] = [];
  selectedOptions: { [key: string]: string } = {};
  unconfirmedResponses: UserResponse[] = [];

  constructor(
    private questionService: QuestionService,
    private userResponseService: UserResponseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.loadUnconfirmedResponses();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  loadUnconfirmedResponses(): void {
    this.userResponseService.getUnconfirmedResponses().subscribe(responses => {
      this.unconfirmedResponses = responses;
    });
  }

  // Calculate the percentage of each choice for a question
  getPercentage(questionId: string, choiceIndex: number): number {
    const responsesForQuestion = this.unconfirmedResponses.filter(response => response.questionId === questionId);
    const totalResponses = responsesForQuestion.length;
    const choiceResponses = responsesForQuestion.filter(response => response.answerIndex === choiceIndex).length;
    return (choiceResponses / totalResponses) * 100;
  }
}