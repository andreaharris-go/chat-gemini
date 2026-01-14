import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyServiceController } from './company-service.controller';
import { CompanyServiceService } from './company-service.service';
import { CompanyService, CompanyServiceSchema } from '../schemas/company-service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyService.name, schema: CompanyServiceSchema },
    ]),
  ],
  controllers: [CompanyServiceController],
  providers: [CompanyServiceService],
})
export class CompanyServiceModule {}
