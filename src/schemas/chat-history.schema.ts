import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'chat_history' })
export class ChatHistory extends Document {
  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  response: string;

  @Prop()
  context: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const ChatHistorySchema = SchemaFactory.createForClass(ChatHistory);
