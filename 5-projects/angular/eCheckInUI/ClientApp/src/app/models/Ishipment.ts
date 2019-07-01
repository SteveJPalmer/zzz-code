import { Delivery, Commodity, Airline, Consignment, Agent ,FlightLeg, Location } from '../models';

export class IShipment {
  public origin: string;
  public destination: string;
  public commodityInfo: Commodity;
  public shcs: number[];
  public airlineInfo: Airline;
  public flightLegs: FlightLeg[];
  public locations: Location[];
  public consignmentInfo: Consignment;
  public deliveryInfo: Delivery;
  public agentInfo: Agent;
  public assignedTo: string;
  public assignedByUser: string;
  public remarks: string;
  public createdTime: number;
}
