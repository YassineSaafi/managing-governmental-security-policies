// question.component.ts

import { Component, OnInit } from '@angular/core';
import { QuestionInterface } from '../question-interface';
import { UserResponse } from '../../user-response/user-response';
import { QuestionService } from '../question.service';
import { UserResponseService } from '../../user-response/user-response.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionnaireComponent implements OnInit {
  categories: string[] = ["q1", "q2", "q3"];
  selectedCategory: string = '';
  questions: QuestionInterface[] = [];
  userResponses: UserResponse[] = [];
  isSuperAdmin = false;
  isAdmin = false;
  newQuestionText = '';
  newQuestionOptions: string[] = [''];
  questionId: string = ''; 
  selectedAnswerIndex: number = 0;

  constructor(
    private questionService: QuestionService,
    private userResponseService: UserResponseService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchQuestions();
    this.fetchUserResponses();
    this.checkAdminStatus();
    this.checkSuperAdminStatus();
  }

  fetchQuestions(): void {
    this.questionService.getAllQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  fetchUserResponses(): void {
    const userId = this.authService.getUserId(); // Obtenir l'ID de l'utilisateur actuel
    if (userId) {
      this.userResponseService.getUserResponsesForCurrentUser().subscribe(userResponses => {
        this.userResponses = userResponses;
      });
    } else {
      console.error("Impossible de récupérer l'ID de l'utilisateur.");
    }
  }

  checkAdminStatus(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  checkSuperAdminStatus(): void {
    this.isSuperAdmin = this.authService.isSuperAdmin(); // Mettez à jour isSuperAdmin selon le statut de l'utilisateur
  }

  saveUserResponse(userId: string, questionId: string | null, answerIndex: number): void {
    if (!questionId) {
        console.error("ID de question invalide.");
        return;
    }

    const userResponse: UserResponse = {
        userId: userId,
        questionId: questionId,
        answerIndex: answerIndex,
        confirmation: 'nonconfirmé' // Ajoutez la propriété confirmation
    };

    this.userResponseService.addUserResponse(userResponse)
        .subscribe(
            () => {
                console.log("Réponse utilisateur enregistrée avec succès.");
            },
            (error) => {
                console.error("Erreur lors de l'enregistrement de la réponse utilisateur :", error);
            }
        );
}

  addQuestion(): void {
    const newQuestion: QuestionInterface = {
      _id: '',
      text: this.newQuestionText,
      options: this.newQuestionOptions,
      category: this.selectedCategory
    };
    console.log(newQuestion)
    this.questionService.addQuestion(newQuestion).subscribe(() => {
      this.newQuestionText = '';
      this.newQuestionOptions = [''];
      this.fetchQuestions();
    });
  }

  addOption(): void {
    this.newQuestionOptions.push('');
  }

  editQuestion(question: QuestionInterface): void {
    // Vérifier si _id est défini
    if (question._id) {
        // Utiliser le service QuestionService pour mettre à jour la question existante
        this.questionService.updateQuestion(question._id, question).subscribe(updatedQuestion => {
          // Réaction après avoir édité la question (par exemple, actualiser les données)
          console.log('Question mise à jour avec succès :', updatedQuestion);
          this.fetchQuestions(); // Actualiser la liste des questions
        }, error => {
          console.error('Une erreur s\'est produite lors de la mise à jour de la question :', error);
          // Gérer l'erreur (afficher un message d'erreur, par exemple)
        });
    } else {
        console.error('L\'ID de la question est indéfini.');
        // Gérer l'erreur (afficher un message d'erreur, par exemple)
    }
  }

  removeOption(index: number): void {
    // Logique pour supprimer une option à l'index spécifié
    this.newQuestionOptions.splice(index, 1);
  }

  deleteQuestion(questionId: string): void {
    this.questionService.deleteQuestion(questionId).subscribe(() => {
      this.fetchQuestions();
    });
  }
}
