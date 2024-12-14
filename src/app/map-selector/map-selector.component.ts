import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-selector',
  standalone: true,
  template: '<div id="map" class="h-64 w-full border"></div>',
  styleUrls: ['./map-selector.component.scss'],
})
export class MapSelectorComponent implements AfterViewInit {
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  private map: L.Map | null = null;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([52.2799, 8.0472], 14); // Beispiel: Osnabrück

    // OpenStreetMap Tiles hinzufügen
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Klick-Event auf der Karte
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const coords = { lat: e.latlng.lat, lng: e.latlng.lng };

      // Marker setzen
      if (this.map) {
        L.marker([coords.lat, coords.lng]).addTo(this.map);
      }

      // Koordinaten senden
      this.locationSelected.emit(coords);
    });
  }
}
