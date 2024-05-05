import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT || 8082);
    const logger = new Logger('Database');
    try {
        await app.get(PrismaService).$connect();
        logger.log('Database connected successfully');
    } catch (error) {
        logger.error('Failed to connect to database', error.stack);
    }
}
bootstrap();
