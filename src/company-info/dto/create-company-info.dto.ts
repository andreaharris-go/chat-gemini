import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateCompanyInfoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mission?: string;

  @IsOptional()
  @IsString()
  vision?: string;

  @IsOptional()
  @IsString()
  founded?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsObject()
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
}
