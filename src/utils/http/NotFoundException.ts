import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(message: string, error?: string) {
    super(404, message, error);
  }
}
