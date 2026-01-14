import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CompanyProductService } from './company-product.service';
import { CreateCompanyProductDto } from './dto/create-company-product.dto';
import { UpdateCompanyProductDto } from './dto/update-company-product.dto';
import { CompanyProduct } from '../schemas/company-product.schema';

@Controller('v1/company-product')
export class CompanyProductController {
  constructor(private readonly companyProductService: CompanyProductService) {}

  @Post()
  async create(
    @Body() createDto: CreateCompanyProductDto,
  ): Promise<CompanyProduct> {
    return this.companyProductService.create(createDto);
  }

  @Get()
  async findAll(): Promise<CompanyProduct[]> {
    return this.companyProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyProduct> {
    return this.companyProductService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCompanyProductDto,
  ): Promise<CompanyProduct> {
    return this.companyProductService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CompanyProduct> {
    return this.companyProductService.remove(id);
  }
}
