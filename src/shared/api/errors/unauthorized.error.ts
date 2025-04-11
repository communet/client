import { ServerError } from '@/shared/api/errors/server.error';

export class UnauthorizedError extends ServerError {
  constructor(message: string) {
    super(message);

    this.name = '[UnauthorizedError]';
  }
}
