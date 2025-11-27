import { create } from './create';
import { getChannels } from './get-channels';
import { update } from './update';
import { deleteChannel } from './delete';

export const channel = {
  getChannels,
  create,
  update,
  delete: deleteChannel,
};
