import { Airline, Agent, Booking, Commodity, Package, IShipment } from '../models';

export class AirwayBill implements IShipment {

  public awbNumber: string;
  public awbType: string;
  public hawbs: Array<any>;
  public liveUntil: number;
  //
  public origin: string;
  public destination: string;
  public commodityInfo: Commodity;
  public bookedInfo: Package;
  public customerReceivedInfo: Package;
  public flightReceivedInfo: Package;
  public shcs: string[];
  public airlineInfo: Airline;
  public agentInfo: Agent;
  public assignedTo: string;
  public assignedByUser: string;
  public remarks: string;
  public createdTime: number;
  public consigneeInfo: Agent;
  public shipperInfo: Agent;
  public bookingInfo: Array<Booking>;

  constructor( awbNumber: string = '',
               awbType: string = '',
               hawbs: any[] = [],
               liveUntil: number = null,
               //
               origin: string = '',
               destination: string = '',
               commodityInfo: Commodity = null,
               bookedInfo: Package = null,
               customerReceivedInfo = null,
               flightReceivedInfo = null,
               shcs: string[] = [],
               airlineInfo: Airline = null,
               agentInfo: Agent = null,
               assignedTo: string = '',
               assignedByUser: string = '',
               remarks: string = '',
               createdTime: number = null,
               consigneeInfo: Agent = null,
               shipperInfo: Agent = null,
               bookingInfo: Booking[] = null
               ) {
    //
    this.awbNumber = awbNumber;
    this.awbType = awbType;
    this.hawbs = hawbs;
    this.liveUntil = liveUntil;
    //
    this.origin = origin;
    this.destination = destination;
    this.commodityInfo = commodityInfo;
    this.bookedInfo = bookedInfo;
    this.customerReceivedInfo = customerReceivedInfo;
    this.flightReceivedInfo = flightReceivedInfo;
    this.shcs = shcs;
    this.airlineInfo = airlineInfo;
    this.agentInfo = agentInfo;
    this.assignedTo = assignedTo;
    this.assignedByUser = assignedByUser;
    this.remarks = remarks;
    this.createdTime = createdTime;
    this.consigneeInfo = consigneeInfo;
    this.shipperInfo = shipperInfo;
    this.bookingInfo = bookingInfo;
  }

}
