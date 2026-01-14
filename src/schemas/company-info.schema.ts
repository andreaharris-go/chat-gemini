import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'company_info' })
export class CompanyInfo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  mission: string;

  @Prop()
  vision: string;

  @Prop()
  founded: string;

  @Prop()
  location: string;

  @Prop({ type: Object })
  contact: {
    email?: string;
    phone?: string;
    website?: string;
  };

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CompanyInfoSchema = SchemaFactory.createForClass(CompanyInfo);
