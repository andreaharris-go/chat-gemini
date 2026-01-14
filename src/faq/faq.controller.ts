import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqRequestDto } from './dto/faq-request.dto';
import { FaqResponseDto } from './dto/faq-response.dto';

@Controller('v1/faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  async handleFaq(
    @Body(ValidationPipe) faqRequest: FaqRequestDto,
  ): Promise<FaqResponseDto> {
    return this.faqService.processFaq(faqRequest);
  }
}
