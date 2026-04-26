export interface TripRecord {
  objectID: string;
  productCode: string;
  productName: string;
  departureDate: string;
  durationDays: number;
  destination: string;
  travelStyle: string;
  price_usd: number;
  price_aud: number;
  seatsAvailable: number;
  isGuaranteed: boolean;
  __queryID?: string;
  __position?: number;
}
