export class DbEntity{
  id: string;
  slug: string;
  createdAt: Date;

  constructor() {
    this.createdAt = new Date();
  }
}
