import { ServerError } from '@/shared/api/errors/server.error';

export class NotFoundError extends ServerError {
  constructor(message: string) {
    super(message);

    this.name = '[NotFoundError]';
  }
}
