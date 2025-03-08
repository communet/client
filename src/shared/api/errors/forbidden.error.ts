import { ServerError } from '@/shared/api/errors/server.error';

export class ForbiddenError extends ServerError {
  constructor(message: string) {
    super(message);

    this.name = '[ForbiddenError]';
  }
}
