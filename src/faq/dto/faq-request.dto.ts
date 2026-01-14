import { IsNotEmpty, IsString } from 'class-validator';

export class FaqRequestDto {
  @IsNotEmpty()
  @IsString()
  client_id: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
