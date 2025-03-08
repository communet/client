import { ServerError } from '@/shared/api/errors/server.error';

export class BadRequestError extends ServerError {
  constructor(message: string) {
    super(message);

    this.name = '[BadRequestError]';
  }
}
