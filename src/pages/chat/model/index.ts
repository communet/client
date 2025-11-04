export class MessageModel {
  constructor(
    public id: string,
    public content: string,
    public chatId: string,
    public senderId: string,
    public createdAt: string,
  ) {}
}
