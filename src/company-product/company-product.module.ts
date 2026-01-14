import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyProductController } from './company-product.controller';
import { CompanyProductService } from './company-product.service';
import { CompanyProduct, CompanyProductSchema } from '../schemas/company-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyProduct.name, schema: CompanyProductSchema },
    ]),
  ],
  controllers: [CompanyProductController],
  providers: [CompanyProductService],
})
export class CompanyProductModule {}
