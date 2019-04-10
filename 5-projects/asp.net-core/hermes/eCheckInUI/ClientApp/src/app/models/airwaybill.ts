import { Delivery, Commodity, Airline, Consignment, Agent ,FlightLeg, Location, IShipment } from '../models';

export class AirwayBill implements IShipment {

  public awbNumber: string;
  public liveUntil: number;
  //
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

  constructor( awbNumber: string = '',
               liveUntil: number = null,
               //
               origin: string = '',
               destination: string = '',
               commodityInfo: Commodity = null,
               shcs: number[] = [],
               airlineInfo: Airline = null,
               flightLegs: FlightLeg[] = [],
               locations: Location[] = [],
               consignmentInfo: Consignment = null,
               deliveryInfo: Delivery = null,
               agentInfo: Agent = null,
               assignedTo: string = '',
               assignedByUser: string = '',
               remarks: string = '',
               createdTime: number = null,
               ) {
    //
    this.awbNumber = awbNumber;
    this.liveUntil = liveUntil;
    //
    this.origin = origin;
    this.destination = destination;
    this.commodityInfo = commodityInfo;
    this.shcs = shcs;
    this.airlineInfo = airlineInfo;
    this.flightLegs = flightLegs;
    this.locations = locations;
    this.consignmentInfo = consignmentInfo;
    this.deliveryInfo = deliveryInfo;
    this.agentInfo = agentInfo;
    this.assignedTo = assignedTo;
    this.assignedByUser = assignedByUser;
    this.remarks = remarks;
    this.createdTime = createdTime;
  }

}

