import { Body, Controller, Post } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqRequestDto } from './dto/faq-request.dto';
import { FaqResponseDto } from './dto/faq-response.dto';

@Controller('v1/faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  async handleFaq(
    @Body() faqRequest: FaqRequestDto,
  ): Promise<FaqResponseDto> {
    return this.faqService.processFaq(faqRequest);
  }
}
