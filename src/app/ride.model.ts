export interface Ride {
  id: string;             // Eindeutige ID des Angebots
  start: string;          // Startort
  destination: string;    // Zielort
  address: string; // Neues Feld für die Adresse
  date: string;           // Datum
  time: string;           // Uhrzeit
  seatsAvailable: number; // Verfügbare Plätze
  driverName: string;     // Name des Fahrers
  phone: string;          // Telefonnummer
  email: string;          // E-Mail-Adresse
  carPlate: string;       // Autokennzeichen
  coordinates: { lat: number; lng: number }; // Standortkoordinaten
  reservations: Reservation[]; // Liste der Reservierungen
}

export interface Reservation {
  id: string;             // ID der Reservierung
  passengerName: string;  // Name des Mitfahrers
  passengerContact: string; // Kontaktinformation (Telefon/E-Mail)
  status: 'pending' | 'confirmed' | 'cancelled'; // Status der Reservierung
}
