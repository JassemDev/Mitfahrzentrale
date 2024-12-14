import { Component, OnInit } from '@angular/core';
import { RidesService } from '../rides.service';
import { Ride } from '../ride.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.scss'
})
export class DriverDashboardComponent implements OnInit {
  rides: Ride[] = [];

  constructor(private ridesService: RidesService) {}

  ngOnInit() {
    this.loadRides();
    // Fahrer kann seine eigenen Fahrten sehen
    this.ridesService.getDriverRides().subscribe((data) => {
      this.rides = data;
    });
  }

  cancelRide(rideId: string) {
    this.ridesService.cancelRide(rideId).subscribe(() => {
      this.rides = this.rides.filter((ride) => ride.id !== rideId);
    });
  }

  confirmReservation(rideId: string, reservationId: string) {
    this.ridesService.confirmReservation(rideId, reservationId).subscribe(() => {
      this.ngOnInit(); // Liste aktualisieren
    });
  }

  loadRides() {
    this.ridesService.getDriverRides().subscribe((data) => {
      this.rides = data;
    });
  }

  deleteRide(rideId: string) {
    this.ridesService.deleteRide(rideId).subscribe(() => {
      alert('Angebot gelöscht!');
      this.loadRides();
    });
  }

  editRide(ride: Ride) {
    // Setze die Werte in das Erstellformular zurück und navigiere dorthin
    this.ridesService.editModeRide = ride; // Vorübergehend speichern
    window.location.href = '/create-ride';
  }
}
