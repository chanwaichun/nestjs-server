import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { createSwaggerConfig } from './swagger.config';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger 配置
  const swaggerConfig = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // 生产环境中关闭 Swagger
  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('swagger', app, document);
    logger.log('swagger地址: http://localhost:3000/swagger');
  }

  // 日志中间件（如果需要的话可以加强日志功能）
  app.use((req, res, next) => {
    logger.log(`Request to ${req.originalUrl}`);
    next();
  });

  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 静态资源配置
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });

  // 启动服务
  await app.listen(3000);
  logger.log('当前项目部署在 http://localhost:3000');
}

bootstrap();
