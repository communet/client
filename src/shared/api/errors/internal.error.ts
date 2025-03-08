import { ServerError } from '@/shared/api/errors/server.error';

export class InternalServerError extends ServerError {
  constructor(message: string) {
    super(message);

    this.name = '[InternalServerError]';
  }
}
