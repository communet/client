import { api } from "../axios";
import { withValidation } from "../common";
import { User } from "./schemas";

export const getUserById = withValidation(User, async (id: string) => {
  const response = await api.get(`/users/${id}`);

  return response.data
});