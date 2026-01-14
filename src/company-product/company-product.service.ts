import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CompanyProduct } from '../schemas/company-product.schema';
import { CreateCompanyProductDto } from './dto/create-company-product.dto';
import { UpdateCompanyProductDto } from './dto/update-company-product.dto';

@Injectable()
export class CompanyProductService {
  constructor(
    @InjectModel(CompanyProduct.name)
    private companyProductModel: Model<CompanyProduct>,
  ) {}

  private validateObjectId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
  }

  async create(createDto: CreateCompanyProductDto): Promise<CompanyProduct> {
    const createdProduct = new this.companyProductModel(createDto);
    return createdProduct.save();
  }

  async findAll(): Promise<CompanyProduct[]> {
    return this.companyProductModel.find().exec();
  }

  async findOne(id: string): Promise<CompanyProduct> {
    this.validateObjectId(id);
    const product = await this.companyProductModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Company product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateDto: UpdateCompanyProductDto,
  ): Promise<CompanyProduct> {
    this.validateObjectId(id);
    const updatedProduct = await this.companyProductModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Company product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<CompanyProduct> {
    this.validateObjectId(id);
    const deletedProduct = await this.companyProductModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Company product with ID ${id} not found`);
    }
    return deletedProduct;
  }
}
