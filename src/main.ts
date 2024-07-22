import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('这个接口文档我是自动生成的')
    .setVersion('1.0')
    .addTag('blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.use((req, res, next) => {
  //   try {
  //     expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({
  //       path: ['/api/user/login'],
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // });

  // app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(function (req, res, next) {
    console.log('res here');
    next();
  });
  app.useGlobalPipes(new ValidationPipe());
  console.log(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  await app.listen(3000);
}

bootstrap();
