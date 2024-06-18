import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuestionInterface } from './question-interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/api/question';

  constructor(private http: HttpClient) { }

  // Ajouter une nouvelle question
  addQuestion(question: QuestionInterface): Observable<QuestionInterface> {
    return this.http.post<QuestionInterface>(`${this.apiUrl}/ajout`, question)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  // Récupérer toutes les questions
  getAllQuestions(): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  // Récupérer une question par son ID
  getQuestionById(id: string): Observable<QuestionInterface> {
    return this.http.get<QuestionInterface>(`${this.apiUrl}/byid/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  // Mettre à jour une question
  updateQuestion(id: string, question: QuestionInterface): Observable<QuestionInterface> {
    return this.http.put<QuestionInterface>(`${this.apiUrl}/update/${id}`, question)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  // Supprimer une question
  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error from QuestionService:', error);
    return throwError(error);
  }
}
