import { AuthoredApi } from "../authored/authored.api";
import type { UserDto } from "./schemas/dtos";
import { UserSchema } from "./schemas/dtos";

const PATHS = {
  ME: '/user/me',
} as const;

export class UserApi extends AuthoredApi {
  public async getMe() {
    return this.get<UserDto>(PATHS.ME, UserSchema);
  }
}
