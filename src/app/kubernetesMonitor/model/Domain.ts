export class Domain {

  constructor(
    public name: string,
    public url: string,
    public timestamp: string,
    public stages: {
      name: string,
      stages: string[]
    } []
  ) {

  }

}
