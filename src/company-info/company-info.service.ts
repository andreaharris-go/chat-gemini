import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CompanyInfo } from '../schemas/company-info.schema';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Injectable()
export class CompanyInfoService {
  constructor(
    @InjectModel(CompanyInfo.name)
    private companyInfoModel: Model<CompanyInfo>,
  ) {}

  private validateObjectId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
  }

  async create(createDto: CreateCompanyInfoDto): Promise<CompanyInfo> {
    const createdInfo = new this.companyInfoModel(createDto);
    return createdInfo.save();
  }

  async findAll(): Promise<CompanyInfo[]> {
    return this.companyInfoModel.find().exec();
  }

  async findOne(id: string): Promise<CompanyInfo> {
    this.validateObjectId(id);
    const info = await this.companyInfoModel.findById(id).exec();
    if (!info) {
      throw new NotFoundException(`Company info with ID ${id} not found`);
    }
    return info;
  }

  async update(
    id: string,
    updateDto: UpdateCompanyInfoDto,
  ): Promise<CompanyInfo> {
    this.validateObjectId(id);
    const updatedInfo = await this.companyInfoModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updatedInfo) {
      throw new NotFoundException(`Company info with ID ${id} not found`);
    }
    return updatedInfo;
  }

  async remove(id: string): Promise<CompanyInfo> {
    this.validateObjectId(id);
    const deletedInfo = await this.companyInfoModel.findByIdAndDelete(id).exec();
    if (!deletedInfo) {
      throw new NotFoundException(`Company info with ID ${id} not found`);
    }
    return deletedInfo;
  }
}
