import { AuthoredApi } from '@shared/api/authored/authored.api';
import type { IApi } from '@shared/api/base.api';
import type { UserDto } from '@shared/api/user/schemas/dtos';
import { UserSchema } from '@shared/api/user/schemas/dtos';
import { Inject } from 'typedi';

const PATHS = {
  ME: '/user/me',
} as const;

export class UserApi {
  public async getMe(@Inject(() => AuthoredApi) api: IApi) {
    return api.get<UserDto>(PATHS.ME, UserSchema);
  }
}
