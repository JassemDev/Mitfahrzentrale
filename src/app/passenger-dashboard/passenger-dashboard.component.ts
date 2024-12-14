import { Component, OnInit } from '@angular/core';
import { RidesService } from '../rides.service';
import { Ride } from '../ride.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-passenger-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-dashboard.component.html',
  styleUrl: './passenger-dashboard.component.scss'
})
export class PassengerDashboardComponent implements OnInit {
  rides: Ride[] = [];

  constructor(private ridesService: RidesService) {}

  ngOnInit() {
    // Liste aller verfügbaren Fahrten
    this.ridesService.getAvailableRides().subscribe((data) => {
      this.rides = data;
    });
  }

  reserveSeat(rideId: string) {
    this.ridesService.reserveSeat(rideId).subscribe(() => {
      alert('Reservierung erfolgreich!');
      this.ngOnInit(); // Liste aktualisieren
    });
  }
}
