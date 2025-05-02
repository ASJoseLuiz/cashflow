import { HttpException } from "./HttpException";

export class ForbiddenException extends HttpException {
  constructor(message: string, error?: string) {
    super(403, message, error);
  }
}
