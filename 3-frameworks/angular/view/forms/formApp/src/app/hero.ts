export class Hero {

  //Note: shorthand - ts compiler generates public field & assigns value, for each public constructor param when create new instance
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {  }

}

