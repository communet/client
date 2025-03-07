import { ServerError } from './server.error';

export class InternalServerError extends ServerError {
  constructor(message: string) {
    super(message);

    this.name = '[InternalServerError]';
  }
}
