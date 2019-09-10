
export class ULDMetadata {

  public uldNumber: string;
  public uldStatus: number;
  public palletOrContainer?: string;
  public intact?: boolean;

  constructor ( uldNumber: string = '',
                uldStatus: number = 0,
                palletOrContainer?: string,
                intact?: boolean ) {
    //
    this.uldNumber = uldNumber;
    this.uldStatus = uldStatus;
    this.palletOrContainer = palletOrContainer;
    this.intact = intact;
  }

}
