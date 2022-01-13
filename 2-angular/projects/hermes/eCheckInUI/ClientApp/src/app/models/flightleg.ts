import { Airline } from './airline';

export class FlightLeg {

  public airlineInfo: Airline;
  public originAirport: string;
  public destinationAirport: string;
  public scheduledTime: string;
  public estimatedTime: string;
  public actualTime: string;

  constructor( airlineInfo: Airline = null,
               originAirport: string = '',
               destinationAirport: string = '',
               scheduledTime: string = '',
               estimatedTime: string = '',
               actualTime: string = ''
               ) {
    //
    this.airlineInfo = airlineInfo;
    this.originAirport = originAirport;
    this.destinationAirport = destinationAirport;
    this.scheduledTime = scheduledTime;
    this.estimatedTime = estimatedTime;
    this.actualTime = actualTime;
  }

}



// [JsonProperty(PropertyName = "actualTime")]
// public string ActualTime { get; private set; }
