import * as fs from 'fs';
import * as path from 'path';

async function validateApp() {
  try {
    console.log('🔍 Validating NestJS application structure...\n');

    // Check if all required files exist
    const requiredFiles = [
      'src/main.ts',
      'src/app.module.ts',
      'src/faq/faq.module.ts',
      'src/faq/faq.controller.ts',
      'src/faq/faq.service.ts',
      'src/faq/dto/faq-request.dto.ts',
      'src/faq/dto/faq-response.dto.ts',
      'src/schemas/company-info.schema.ts',
      'src/schemas/company-service.schema.ts',
      'src/schemas/company-product.schema.ts',
      'src/schemas/chat-history.schema.ts',
      'tsconfig.json',
      'nest-cli.json',
      'package.json',
      '.env.example'
    ];

    let allFilesExist = true;
    for (const file of requiredFiles) {
      if (fs.existsSync(path.join(process.cwd(), file))) {
        console.log(`✓ ${file}`);
      } else {
        console.log(`✗ ${file} - MISSING`);
        allFilesExist = false;
      }
    }

    if (!allFilesExist) {
      console.error('\n❌ Some required files are missing!');
      process.exit(1);
    }

    // Check if dist directory exists (build output)
    if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
      console.log('\n✓ Build output directory exists');
    }

    console.log('\n✅ Application structure validation passed!');
    console.log('\nNext steps:');
    console.log('1. Set up MongoDB (local or cloud)');
    console.log('2. Get a Gemini API key from Google AI Studio: https://ai.google.dev/');
    console.log('3. Copy .env.example to .env and configure with your credentials');
    console.log('4. Run: npm run init-db (to initialize database with sample data)');
    console.log('5. Run: npm run start:dev (to start the application)');
    console.log('\nAPI Endpoint:');
    console.log('POST http://localhost:3000/v1/faq');
    console.log('Body: { "client_id": "111", "message": "what does your company do?" }');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

validateApp();
