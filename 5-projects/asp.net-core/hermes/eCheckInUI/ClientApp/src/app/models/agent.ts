export class Agent {
  public code: string;
  public name: string;
  public agentIATAAddress: string;
  public rakcCode: string;

  constructor( code: string = '',
               name: string = '',
               agentIATAAddress: string = '',
               rakcCode: string = '' ) {
    //
    this.code = code;
    this.name = name;
    this.agentIATAAddress = agentIATAAddress;
    this.rakcCode = rakcCode;
  }

}
