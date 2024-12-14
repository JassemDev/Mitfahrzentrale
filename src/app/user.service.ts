import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = {
    id: 1,
    fullName: 'Max Mustermann',
    email: 'max.mustermann@example.com',
    phone: '+49 123 456 7890',
    address: 'Beispielstraße 12, 12345 Musterstadt',
  };

  getUser(): Observable<any> {
    // Simuliert den Abruf von Benutzerdaten aus einem Backend
    return of({ ...this.user });
  }

  updateUser(updatedUser: any): Observable<any> {
    // Simuliert das Speichern von Benutzerdaten im Backend
    this.user = { ...updatedUser };
    return of({ success: true });
  }
}
