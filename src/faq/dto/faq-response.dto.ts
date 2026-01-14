export class FaqResponseDto {
  response: string;
  timestamp: Date;
  
  constructor(response: string) {
    this.response = response;
    this.timestamp = new Date();
  }
}
