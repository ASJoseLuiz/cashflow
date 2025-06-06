export class HttpException extends Error {
  status: number;
  message: string;
  error: string | undefined;
  constructor(status: number, message: string, error?: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
