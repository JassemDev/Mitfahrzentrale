import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = null; // Benutzerdaten
  editMode: boolean = false; // Bearbeiten-Modus
  loading: boolean = false; // Laden-Zustand
  error: string | null = null; // Fehler-Handling
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.loading = true;
    this.error = null;
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Benutzerdaten konnten nicht geladen werden.';
        this.loading = false;
      },
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    this.loading = true;
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.editMode = false;
        this.loading = false;
        alert('Profil erfolgreich gespeichert!');
      },
      error: () => {
        this.error = 'Fehler beim Speichern des Profils.';
        this.loading = false;
      },
    });
  }
}
