import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ride } from './ride.model';


@Injectable({
  providedIn: 'root',
})
export class RidesService {
  // private rides: Ride[] = [
  //   {
  //     id: '1',
  //     start: 'Osnabrück',
  //     destination: 'BBS Brinkstraße',
  //     address: 'Brinkstraße 17, 49082 Osnabrück',
  //     date: '2024-12-20',
  //     time: '08:00',
  //     seatsAvailable: 3,
  //     driverName: 'Max Mustermann',
  //     phone: '+49 123 456 7890',
  //     email: 'max@example.com',
  //     carPlate: 'OS-AB 123',
  //     coordinates: { lat: 52.2799, lng: 8.0472 },
  //     reservations: [],
  //   },
  // ];
  private rides: Ride[] = [];
  public editModeRide: Ride | null = null;

  getDriverRides(): Observable<Ride[]> {
    return of(this.rides);
  }



  updateRide(ride: Ride): Observable<void> {
    const index = this.rides.findIndex((r) => r.id === ride.id);
    if (index !== -1) {
      this.rides[index] = { ...ride };
    }
    return of();
  }

  deleteRide(rideId: string): Observable<void> {
    this.rides = this.rides.filter((r) => r.id !== rideId);
    return of();
  }

  getAvailableRides(): Observable<Ride[]> {
    return of(this.rides.filter((ride) => ride.seatsAvailable > 0));
  }

  reserveSeat(rideId: string): Observable<void> {
    const ride = this.rides.find((r) => r.id === rideId);
    if (ride) {
      ride.seatsAvailable -= 1;
      ride.reservations.push({
        id: `${Date.now()}`,
        passengerName: 'John Doe', // Beispiel: Benutzer aus Session
        passengerContact: 'john@example.com',
        status: 'pending',
      });
    }
    return of();
  }

  confirmReservation(rideId: string, reservationId: string): Observable<void> {
    const ride = this.rides.find((r) => r.id === rideId);
    const reservation = ride?.reservations.find((res) => res.id === reservationId);
    if (reservation) reservation.status = 'confirmed';
    return of();
  }

  cancelRide(rideId: string): Observable<void> {
    this.rides = this.rides.filter((ride) => ride.id !== rideId);
    return of();
  }

  createRide(ride: Ride): Observable<void> {
    // Generiere eine eindeutige ID
    ride.id = `${Date.now()}`;
    this.rides.push(ride); // Füge das neue Ride-Objekt zur Liste hinzu
    return of();
  }

  getRides(): Observable<Ride[]> {
    return of(this.rides); // Rückgabe der aktuellen Fahrten
  }

}
