import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'company_products', timestamps: true })
export class CompanyProduct extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop([String])
  features: string[];

  @Prop()
  price: number;

  @Prop()
  availability: string;
}

export const CompanyProductSchema = SchemaFactory.createForClass(CompanyProduct);
