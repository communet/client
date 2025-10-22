export class ChannelModel {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly creatorId: string,
  ) {}
}
