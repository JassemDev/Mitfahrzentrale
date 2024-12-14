import { Component, Input } from '@angular/core';
import { Ride } from '../../ride.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-ride',
  standalone: true,
  imports: [],
  templateUrl: './ride.component.html',
  styleUrl: './ride.component.scss'
})
export class RideComponent {
  @Input() ride!: Ride;

  ngAfterViewInit(): void {
    const map = L.map(`map-${this.ride.start}`).setView([this.ride.coordinates.lat, this.ride.coordinates.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([this.ride.coordinates.lat, this.ride.coordinates.lng]).addTo(map);
  }
}
