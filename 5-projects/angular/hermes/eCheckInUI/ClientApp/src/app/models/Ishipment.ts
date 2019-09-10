import { Commodity, Agent, Package } from '../models';

export class IShipment {
  public origin: string;
  public destination: string;
  public commodityInfo: Commodity;
  public bookedInfo: Package;
  public customerReceivedInfo: Package;
  public flightReceivedInfo: Package;
  public shcs: string[];
  public agentInfo: Agent;
  public assignedTo: string;
  public assignedByUser: string;
  public remarks: string;
  public createdTime: number;
  public consigneeInfo: Agent;
  public shipperInfo: Agent;
  public bookingInfo: any[];
}
