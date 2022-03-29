export interface MessagingAdapter {
  sendMessage(topic: string, message: any): Promise<void>;
}