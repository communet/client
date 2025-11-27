import { create } from './create';
import { deleteMessage } from './delete';
import { getMessages } from './get-messages';
import { update } from './update';

export const message = {
  create,
  getMessages,
  update,
  delete: deleteMessage,
};
