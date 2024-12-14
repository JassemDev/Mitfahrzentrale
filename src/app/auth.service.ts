import { Injectable } from '@angular/core';
import { of, throwError, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validUser = {
    email: 'jassem117@gmail.com',
    password: 'password123',
  };

  login(email: string, password: string): Observable<{ token: string }> {
    // Simuliert eine Serverantwort mit Verzögerung
    if (email === this.validUser.email && password === this.validUser.password) {
      return of({ token: 'mock-token-123456' }).pipe(delay(1000));
    } else {
      return throwError(() => new Error('Ungültige Anmeldedaten.'));
    }
  }

  isAuthenticated(): boolean {
    // Prüft, ob ein Token vorhanden ist
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
