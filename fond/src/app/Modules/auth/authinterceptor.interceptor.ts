import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      const token = currentUser.token;
      const userId = currentUser.id;
      
      console.log('Adding headers:', {
        Authorization: `Bearer ${token}`,
        'X-User-ID': userId ? userId.toString() : '',
      });

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'X-User-ID': userId ? userId.toString() : '',
        },
      });

      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
