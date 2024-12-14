import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RidesService } from '../rides.service';
import { FormsModule } from '@angular/forms';
import { Ride } from '../ride.model';
import { MapSelectorComponent } from "../map-selector/map-selector.component";

@Component({
  selector: 'app-create-ride',
  standalone: true,
  imports: [CommonModule, FormsModule, MapSelectorComponent],
  templateUrl: './create-ride.component.html',
  styleUrl: './create-ride.component.scss'
})
export class CreateRideComponent {
  ride: Ride = {
    id: '', // Initial leer, wird beim Speichern generiert
    start: '',
    destination: '',
    address: '',
    date: '',
    time: '',
    seatsAvailable: 1,
    driverName: '',
    phone: '',
    email: '',
    carPlate: '',
    coordinates: { lat: 0, lng: 0 },
    reservations: [], // Keine Reservierungen bei der Erstellung
  };

  editMode = false;

  constructor(private ridesService: RidesService) {}

  ngOnInit() {
    if (this.ridesService.editModeRide) {
      this.ride = { ...this.ridesService.editModeRide };
      this.editMode = true;
      this.ridesService.editModeRide = null;
    }
  }

  createRide() {
    if (this.editMode) {
      this.ridesService.updateRide(this.ride).subscribe(() => {
        alert('Angebot aktualisiert!');
        this.resetForm();
      });
    } else {
      this.ridesService.createRide(this.ride).subscribe(() => {
        alert('Angebot erstellt!');
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.ride = {
      id: '',
      start: '',
      destination: '',
      address: '',
      date: '',
      time: '',
      seatsAvailable: 1,
      driverName: '',
      phone: '',
      email: '',
      carPlate: '',
      coordinates: { lat: 0, lng: 0 },
      reservations: [],
    };
    this.editMode = false;
  }

  onLocationSelected(coords: { lat: number; lng: number }) {
    this.ride.coordinates = coords;
  }
}
