import { ServerError } from './server.error';

export class ForbiddenError extends ServerError {
  constructor(message: string) {
    super(message);

    this.name = '[ForbiddenError]';
  }
}
