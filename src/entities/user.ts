export class User {
  constructor(
    public key: string,
    public value: { name: string; email: string; password: string }
  ) {}
}
