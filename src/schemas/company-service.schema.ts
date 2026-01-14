import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'company_services', timestamps: true })
export class CompanyService extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop([String])
  features: string[];

  @Prop()
  pricing: string;
}

export const CompanyServiceSchema = SchemaFactory.createForClass(CompanyService);
