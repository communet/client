import { create } from './create';
import { deleteChat } from './delete';
import { getChats } from './get-chats';
import { update } from './update';

export const chat = {
  getChats,
  create,
  update,
  delete: deleteChat,
};
