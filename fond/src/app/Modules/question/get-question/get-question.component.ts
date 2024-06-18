import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionInterface } from '../question-interface';
import { AuthService } from '../../auth/auth.service';
import { UserResponseService } from '../../user-response/user-response.service';
import { UserResponse } from '../../user-response/user-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './get-question.component.html',
  styleUrls: ['./get-question.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: QuestionInterface[] = [];
  selectedOptions: { [key: string]: string } = {};

  constructor(
    private questionService: QuestionService,
    private userResponseService: UserResponseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(userId => {
      if (!userId) {
        console.error("Impossible de récupérer l'utilisateur actuel.");
        return;
      }
      this.loadQuestions();
      this.loadUserResponses();
    });
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  loadUserResponses(): void {
    this.userResponseService.getUserResponsesForCurrentUser().subscribe(responses => {
      responses.forEach(response => {
        this.selectedOptions[response.questionId] = response.answerIndex.toString();
      });
    });
  }

  selectOption(questionId: string, optionIndex: number): void {
    this.selectedOptions[questionId] = optionIndex.toString();
  }

  submitAnswers(): void {
    this.authService.getUserId().subscribe(userId => {
      if (!userId) {
        console.error("Impossible de récupérer l'utilisateur actuel.");
        return;
      }

      Object.keys(this.selectedOptions).forEach(questionId => {
        const answerIndexStr = this.selectedOptions[questionId];
        const answerIndex = parseInt(answerIndexStr, 10);
        
        this.saveUserResponse(userId, questionId, answerIndex);
      });
    });
  }

  deleteQuestion(questionId: string): void {
    console.log('Question supprimée avec l\'ID :', questionId);
    // Vous devez implémenter la logique pour supprimer la question de votre backend
  }

  editQuestion(questionId: string): void {
    console.log('Question éditée avec l\'ID :', questionId);
    // Vous devez implémenter la logique pour éditer la question (par exemple, afficher un formulaire de modification)
  }

  saveUserResponse(userId: string, questionId: string, answerIndex: number): void {
    if (!questionId) {
      console.error("ID de question invalide.");
      return;
    }

    const userResponse: UserResponse = {
      userId: userId,
      questionId: questionId,
      answerIndex: answerIndex,
      confirmation: 'nonconfirmé'
    };

    this.userResponseService.addUserResponse(userResponse)
      .subscribe(
        () => {
          console.log("Réponse utilisateur enregistrée avec succès.");
          alert('Réponse utilisateur enregistrée avec succès.');
        },
        (error) => {
          console.error("Erreur lors de l'enregistrement de la réponse utilisateur :", error);
        }
      );
  }
}