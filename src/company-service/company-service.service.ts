import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyService } from '../schemas/company-service.schema';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';
import { UpdateCompanyServiceDto } from './dto/update-company-service.dto';

@Injectable()
export class CompanyServiceService {
  constructor(
    @InjectModel(CompanyService.name)
    private companyServiceModel: Model<CompanyService>,
  ) {}

  async create(createDto: CreateCompanyServiceDto): Promise<CompanyService> {
    const createdService = new this.companyServiceModel(createDto);
    return createdService.save();
  }

  async findAll(): Promise<CompanyService[]> {
    return this.companyServiceModel.find().exec();
  }

  async findOne(id: string): Promise<CompanyService> {
    const service = await this.companyServiceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Company service with ID ${id} not found`);
    }
    return service;
  }

  async update(
    id: string,
    updateDto: UpdateCompanyServiceDto,
  ): Promise<CompanyService> {
    const updatedService = await this.companyServiceModel
      .findByIdAndUpdate(id, { ...updateDto, updatedAt: new Date() }, { new: true })
      .exec();

    if (!updatedService) {
      throw new NotFoundException(`Company service with ID ${id} not found`);
    }
    return updatedService;
  }

  async remove(id: string): Promise<CompanyService> {
    const deletedService = await this.companyServiceModel.findByIdAndDelete(id).exec();
    if (!deletedService) {
      throw new NotFoundException(`Company service with ID ${id} not found`);
    }
    return deletedService;
  }
}
