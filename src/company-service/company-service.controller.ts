import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CompanyServiceService } from './company-service.service';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';
import { UpdateCompanyServiceDto } from './dto/update-company-service.dto';
import { CompanyService } from '../schemas/company-service.schema';

@Controller('v1/company-service')
export class CompanyServiceController {
  constructor(private readonly companyServiceService: CompanyServiceService) {}

  @Post()
  async create(
    @Body() createDto: CreateCompanyServiceDto,
  ): Promise<CompanyService> {
    return this.companyServiceService.create(createDto);
  }

  @Get()
  async findAll(): Promise<CompanyService[]> {
    return this.companyServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyService> {
    return this.companyServiceService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCompanyServiceDto,
  ): Promise<CompanyService> {
    return this.companyServiceService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CompanyService> {
    return this.companyServiceService.remove(id);
  }
}
