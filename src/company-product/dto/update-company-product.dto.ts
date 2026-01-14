import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class UpdateCompanyProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  availability?: string;
}
