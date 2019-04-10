import { AirwayBill } from '../models';

export interface IPickupList {
  userProvidedAirwayBill: AirwayBill,
  pieces: string,
  weight: string,
  //
  aWBNumber: string,
  origin: string,
  destination: string,
  expectedNumberOfPieces: string,
  expectedWeight: string
}

