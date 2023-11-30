import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    console.log('eeeee');
    console.log('res here');
    next();
  });
  await app.listen(3000);
}

bootstrap();
