import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RidesService } from '../rides.service';
import { Ride } from '../ride.model';
import { RideComponent } from "./ride/ride.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RideComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  rides: Ride[] = [];

  constructor(private ridesService: RidesService) {}

  ngOnInit() {
    this.ridesService.getRides().subscribe((data) => {
      this.rides = data;
    });
  }

}
