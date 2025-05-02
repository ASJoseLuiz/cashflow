export class Income {
  constructor(
    public key: string,
    public value: {
      userId: string;
      value: number;
      category: string;
      description: string;
      date: Date;
    }
  ) {}
}
