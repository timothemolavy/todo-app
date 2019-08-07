export class Item {
  id: number;
  name: string = '';
  complete: boolean = false;

  constructor(id?: number, name?: string, complete?: boolean) {
    this.id = id;
    this.name = name;
    this.complete = complete;
  }
}
