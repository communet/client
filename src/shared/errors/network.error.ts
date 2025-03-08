import { AppError } from '@/shared/errors/app.error';

export class NetworkError extends AppError {
  constructor(message: string) {
    super(message);

    this.name = '[NetworkError]';
  }
}
