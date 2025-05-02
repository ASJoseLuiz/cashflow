import { HttpException } from "./HttpException";

export class BadRequestException extends HttpException {
  constructor(message: string, error?: string) {
    super(400, message, error);
  }
}
