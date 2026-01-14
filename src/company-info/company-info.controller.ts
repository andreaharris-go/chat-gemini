import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import { CompanyInfo } from '../schemas/company-info.schema';

@Controller('v1/company-info')
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompanyInfoService) {}

  @Post()
  async create(
    @Body() createDto: CreateCompanyInfoDto,
  ): Promise<CompanyInfo> {
    return this.companyInfoService.create(createDto);
  }

  @Get()
  async findAll(): Promise<CompanyInfo[]> {
    return this.companyInfoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyInfo> {
    return this.companyInfoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCompanyInfoDto,
  ): Promise<CompanyInfo> {
    return this.companyInfoService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CompanyInfo> {
    return this.companyInfoService.remove(id);
  }
}
