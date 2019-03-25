import { Commodity } from './commodity';
import { Agent } from './agent';

export class Booking {
  public pieces: string;
  public weight: string;
  public airline: string;
  public destination: string;
  public commodityInfo: Commodity;
  public agentInfo: Agent;
  public shcs: Array<string>;

  constructor( pieces: string = '',
               weight: string = '',
               airline: string = '',
               destination: string = '',
               commodityInfo: Commodity = new Commodity(),
               agentInfo: Agent = new Agent(),
               shcs: Array<string> = []
               ) {
    //
    this.pieces = pieces;
    this.weight = weight;
    this.airline = airline;
    this.destination = destination;
    this.commodityInfo = commodityInfo;
    this.agentInfo = agentInfo;
    this.shcs = shcs;
  }

}

