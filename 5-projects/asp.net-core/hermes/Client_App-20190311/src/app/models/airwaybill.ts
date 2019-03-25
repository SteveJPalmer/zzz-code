export class AirwayBill {

  constructor(
    public id: string = '',
    public aWBNumber: string = '',
    public origin: string = '',
    public destination: string = '',
    public numberOfPieces: string = '',
    public weight: string = '',
    public volume: string = '',
  ) {}
}
