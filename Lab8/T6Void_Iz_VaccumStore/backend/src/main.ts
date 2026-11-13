import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS so frontend (HTML/Bootstrap or Postman) can interact seamlessly
  app.enableCors();
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Void Iz Vaccum Backend is running on: http://localhost:${port}`);
}
bootstrap();

