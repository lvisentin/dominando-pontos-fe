export interface User {
  id: number;
  code: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: Date;
  arrivalDate: Date;
  cabinClass: string;
  source: string;
  createdAt: string
  updatedAt: string
}