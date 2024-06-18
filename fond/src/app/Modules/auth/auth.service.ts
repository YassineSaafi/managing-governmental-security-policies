import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError , map} from 'rxjs/operators';
import { UserModel } from '../auth/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private userIdSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}
  

  login(credentials: { email: string, password: string }): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token;
        const userId = response.userId;
        console.log(userId)
        if (token && userId) {
          localStorage.setItem('currentUser', JSON.stringify({ token, userId }));
          this.userIdSubject.next(userId);
        }
      }),
      catchError(this.handleError<UserModel>('login'))
    );
  }
  
  getUserId(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.userIdSubject.next(null);
  }

  getCurrentUser(): UserModel | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  getAuthToken(): Observable<string | null> {
    const user = this.getCurrentUser();
    return of(user).pipe(
      map((u: UserModel | null) => (u?.token ?? null)) // Use nullish coalescing operator
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  register(credentials: { nom: string, email: string, password: string, role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`, credentials).pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/auth/profile`).pipe(
      catchError(this.handleError<any>('getProfile'))
    );
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.roles.includes('admin') : false;
  }

  isSuperAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.roles.includes('SuperAdmin') : false;
  }
}