# Chat Gemini - NestJS AI Chat Application

A NestJS-based RESTful API application that provides an intelligent FAQ chatbot using Google's Gemini AI, with MongoDB for data persistence.

## Tech Stack

- **NestJS v11** - Progressive Node.js framework
- **MongoDB** - NoSQL database with the following collections:
  - `company_info` - Company information
  - `company_services` - Services offered
  - `company_products` - Products catalog
  - `chat_history` - Chat conversation history
- **Google Gemini AI** - AI model: `gemini-2.0-flash-exp`
- **TypeScript** - Type-safe development

## Features

- **RESTful API** endpoint for customer chat: `POST /v1/faq`
- **Intelligent Query Understanding** - Analyzes customer questions to determine relevant data needs
- **Context-Aware Responses** - Queries MongoDB for relevant company information
- **AI-Powered Responses** - Uses Gemini AI to generate natural, contextual responses
- **Chat History** - Automatically saves all conversations to database

## Prerequisites

- Node.js (v20 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API Key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chat-gemini
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/chat-gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash-exp
PORT=3000
```

4. Initialize the database with sample data:
```bash
npm run init-db
```

## Running the Application

### Development mode:
```bash
npm run start:dev
```

### Production mode:
```bash
npm run build
npm run start:prod
```

The application will start on `http://localhost:3000`

## API Usage

### POST /v1/faq

Send a customer question and receive an AI-generated response.

**Request:**
```json
{
  "client_id": "111",
  "message": "what does your company do?"
}
```

**Response:**
```json
{
  "response": "We are a leading technology company that provides innovative solutions...",
  "timestamp": "2024-01-14T09:00:00.000Z"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/v1/faq \
  -H "Content-Type: application/json" \
  -d '{"client_id":"111","message":"what does your company do?"}'
```

## How It Works

1. **Receive Message** - Client sends a question with their client_id
2. **Understand Query** - System analyzes the question to determine what information is needed
3. **Query Database** - Fetches relevant data from MongoDB collections (company info, services, products)
4. **Generate Response** - Sends the question and context to Gemini AI for a natural response
5. **Save History** - Stores the conversation in chat_history collection

## Project Structure

```
chat-gemini/
├── src/
│   ├── faq/                    # FAQ module
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── faq.controller.ts   # REST controller
│   │   ├── faq.service.ts      # Business logic
│   │   └── faq.module.ts       # Module definition
│   ├── schemas/                # MongoDB schemas
│   │   ├── company-info.schema.ts
│   │   ├── company-service.schema.ts
│   │   ├── company-product.schema.ts
│   │   └── chat-history.schema.ts
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Application entry point
├── scripts/
│   └── init-db.ts              # Database initialization script
└── package.json
```

## Scripts

- `npm run start:dev` - Start in development mode with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start in production mode
- `npm run init-db` - Initialize database with sample data

## Database Collections

### company_info
Stores general company information like name, description, mission, vision, location, and contact details.

### company_services
Stores services offered by the company including name, description, category, features, and pricing.

### company_products
Stores product information including name, description, category, features, price, and availability.

### chat_history
Stores all chat conversations with clientId, message, response, context, and timestamp.

## License

ISC
