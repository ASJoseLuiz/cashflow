export class Expense {
  constructor(
    public key: string,
    public value: {
      userId: string;
      valor: number;
      categoria: string;
      description: string;
      date: Date;
    }
  ) {}
}
