import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { CompanyInfo, CompanyInfoSchema } from '../schemas/company-info.schema';
import { CompanyService, CompanyServiceSchema } from '../schemas/company-service.schema';
import { CompanyProduct, CompanyProductSchema } from '../schemas/company-product.schema';
import { ChatHistory, ChatHistorySchema } from '../schemas/chat-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyInfo.name, schema: CompanyInfoSchema },
      { name: CompanyService.name, schema: CompanyServiceSchema },
      { name: CompanyProduct.name, schema: CompanyProductSchema },
      { name: ChatHistory.name, schema: ChatHistorySchema },
    ]),
  ],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
