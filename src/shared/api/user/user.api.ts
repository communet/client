import { AuthoredApi } from "@/shared/api/authored/authored.api";
import type { UserDto } from "@/shared/api/user/schemas/dtos";
import { UserSchema } from "@/shared/api/user/schemas/dtos";

const PATHS = {
  ME: '/user/me',
} as const;

export class UserApi extends AuthoredApi {
  public async getMe() {
    return this.get<UserDto>(PATHS.ME, UserSchema);
  }
}
