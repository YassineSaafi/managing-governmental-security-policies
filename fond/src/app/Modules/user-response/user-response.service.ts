import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UserResponse } from './user-response';

@Injectable({
  providedIn: 'root'
})
export class UserResponseService {
  private apiUrl = 'http://localhost:3000/api/res';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserResponsesForCurrentUser(): Observable<UserResponse[]> {
    return this.authService.getAuthToken().pipe(
      switchMap(token => {
        if (!token) {
          console.error("Token JWT introuvable.");
          return of([]);
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<UserResponse[]>(`${this.apiUrl}/get`, { headers });
      }),
      catchError(this.handleError<UserResponse[]>('getUserResponsesForCurrentUser', []))
    );
  }

  addUserResponse(userResponse: UserResponse): Observable<UserResponse> {
    return this.authService.getAuthToken().pipe(
      switchMap(token => {
        if (!token) {
          console.error("Token JWT introuvable.");
          return throwError("Token JWT introuvable.");
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<UserResponse>(`${this.apiUrl}/add`, userResponse, { headers });
      }),
      catchError(this.handleError<UserResponse>('addUserResponse'))
    );
  }

  deleteUserResponse(userResponseId: string): Observable<void> {
    return this.authService.getAuthToken().pipe(
      switchMap(token => {
        if (!token) {
          console.error("Token JWT introuvable.");
          return of(undefined);
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<void>(`${this.apiUrl}/delete/${userResponseId}`, { headers });
      }),
      catchError(this.handleError<void>('deleteUserResponse'))
    );
  }

  getConfirmedResponsesStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`).pipe(
      catchError(this.handleError<any>('getConfirmedResponsesStatistics'))
    );
  }

  getUnconfirmedResponses(): Observable<UserResponse[]> {
    return this.authService.getAuthToken().pipe(
      switchMap(token => {
        if (!token) {
          console.error("Token JWT introuvable.");
          return of([]);
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<UserResponse[]>(`${this.apiUrl}/getUnconfirmed`, { headers });
      }),
      catchError(this.handleError<UserResponse[]>('getUnconfirmedResponses', []))
    );
  }

  onConfirm(userResponse: UserResponse, confirmation: 'accepté' | 'refusé'): Observable<UserResponse> {
    return this.authService.getAuthToken().pipe(
      switchMap(token => {
        if (!token) {
          console.error("Token JWT introuvable.");
          return throwError("Token JWT introuvable.");
        }
        userResponse.confirmation = confirmation;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put<UserResponse>(`${this.apiUrl}/confirm/${userResponse.questionId}`, userResponse, { headers });
      }),
      catchError(this.handleError<UserResponse>('onConfirm'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
