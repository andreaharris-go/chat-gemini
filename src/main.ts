import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // Check if SSL certificates exist for HTTPS
  // Use process.cwd() to get project root directory (works in both dev and prod)
  const keyPath = path.join(process.cwd(), 'certs', 'localhost-key.pem');
  const certPath = path.join(process.cwd(), 'certs', 'localhost-cert.pem');

  console.log('Checking SSL certificates:');
  console.log('Key path:', keyPath, '- Exists:', fs.existsSync(keyPath));
  console.log('Cert path:', certPath, '- Exists:', fs.existsSync(certPath));

  let httpsOptions = null;
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  // Enable CORS
  app.enableCors();

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  console.log('Starting application...', httpsOptions);

  await app.listen(port);
  const protocol = httpsOptions ? 'https' : 'http';
  console.log(`Application is running on: ${protocol}://localhost:${port}`);
}

bootstrap();
