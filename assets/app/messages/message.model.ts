export class Message {
  constructor(
    public content: string,
    public username: string,
    public messageId?: string,
    public useerId?: string) {}
}
