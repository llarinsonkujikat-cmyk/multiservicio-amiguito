import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Habilitar CORS para permitir peticiones desde el frontend (Next.js)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Servidor backend escuchando en: http://localhost:${port}`);
}
bootstrap();
