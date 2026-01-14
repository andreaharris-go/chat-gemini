import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { CompanyInfo } from '../schemas/company-info.schema';
import { CompanyService } from '../schemas/company-service.schema';
import { CompanyProduct } from '../schemas/company-product.schema';
import { ChatHistory } from '../schemas/chat-history.schema';
import { FaqRequestDto } from './dto/faq-request.dto';
import { FaqResponseDto } from './dto/faq-response.dto';

@Injectable()
export class FaqService {
  private readonly logger = new Logger(FaqService.name);
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(
    @InjectModel(CompanyInfo.name) private companyInfoModel: Model<CompanyInfo>,
    @InjectModel(CompanyService.name) private companyServiceModel: Model<CompanyService>,
    @InjectModel(CompanyProduct.name) private companyProductModel: Model<CompanyProduct>,
    @InjectModel(ChatHistory.name) private chatHistoryModel: Model<ChatHistory>,
    private configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const modelName = this.configService.get<string>('GEMINI_MODEL') || 'gemini-2.0-flash-exp';
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: modelName });
  }

  async processFaq(faqRequest: FaqRequestDto): Promise<FaqResponseDto> {
    try {
      const { client_id, message } = faqRequest;

      // Step 1: Understand the question and determine what data to query
      const queryIntent = await this.understandQuery(message);
      
      // Step 2: Query relevant data from MongoDB
      const relevantData = await this.queryRelevantData(queryIntent);
      
      // Step 3: Generate response using Gemini
      const response = await this.generateResponse(message, relevantData);
      
      // Step 4: Save chat history
      await this.saveChatHistory(client_id, message, response, JSON.stringify(relevantData));
      
      return new FaqResponseDto(response);
    } catch (error) {
      this.logger.error(`Error processing FAQ: ${error.message}`, error.stack);
      throw error;
    }
  }

  private async understandQuery(message: string): Promise<{
    needsCompanyInfo: boolean;
    needsServices: boolean;
    needsProducts: boolean;
  }> {
    // Simple keyword-based understanding (can be enhanced with more sophisticated NLP)
    const lowerMessage = message.toLowerCase();
    
    return {
      needsCompanyInfo: 
        lowerMessage.includes('company') ||
        lowerMessage.includes('about') ||
        lowerMessage.includes('who') ||
        lowerMessage.includes('what') ||
        lowerMessage.includes('do') ||
        lowerMessage.includes('mission') ||
        lowerMessage.includes('vision') ||
        lowerMessage.includes('contact') ||
        lowerMessage.includes('location'),
      needsServices:
        lowerMessage.includes('service') ||
        lowerMessage.includes('offer') ||
        lowerMessage.includes('provide') ||
        lowerMessage.includes('help'),
      needsProducts:
        lowerMessage.includes('product') ||
        lowerMessage.includes('sell') ||
        lowerMessage.includes('buy') ||
        lowerMessage.includes('price'),
    };
  }

  private async queryRelevantData(queryIntent: any): Promise<any> {
    const data: any = {};

    if (queryIntent.needsCompanyInfo) {
      data.companyInfo = await this.companyInfoModel.find().exec();
    }

    if (queryIntent.needsServices) {
      data.services = await this.companyServiceModel.find().exec();
    }

    if (queryIntent.needsProducts) {
      data.products = await this.companyProductModel.find().exec();
    }

    return data;
  }

  private async generateResponse(message: string, context: any): Promise<string> {
    try {
      // Build a prompt with context
      const contextStr = JSON.stringify(context, null, 2);
      const prompt = `You are a helpful customer service assistant. 
      
User question: ${message}

Context from our database:
${contextStr}

Please provide a helpful, accurate, and friendly response based on the context provided. 
If the context doesn't contain relevant information, politely let the user know and suggest they contact support.`;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      this.logger.error(`Error generating AI response: ${error.message}`);
      throw new Error('Failed to generate response');
    }
  }

  private async saveChatHistory(
    clientId: string,
    message: string,
    response: string,
    context: string,
  ): Promise<void> {
    try {
      const chatHistory = new this.chatHistoryModel({
        clientId,
        message,
        response,
        context,
      });
      await chatHistory.save();
    } catch (error) {
      this.logger.error(`Error saving chat history: ${error.message}`);
      // Don't throw error here as the main operation succeeded
    }
  }
}
