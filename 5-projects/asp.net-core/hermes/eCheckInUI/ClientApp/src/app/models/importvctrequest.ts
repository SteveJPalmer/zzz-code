import { Appointment } from './appointment';

export class ImportVCTRequest {

  public appointmentInfo: Appointment;
  public rampRequested: boolean;

  constructor( appointmentInfo: Appointment = null,
               rampRequested: boolean = false) {
    //
    this.appointmentInfo = appointmentInfo;
    this.rampRequested = rampRequested;
  }

}
