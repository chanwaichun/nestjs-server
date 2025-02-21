import { DocumentBuilder } from '@nestjs/swagger';

export const createSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('这个接口文档我是自动生成的')
    .setVersion('1.0')
    .addTag('接口文档')
    .addBearerAuth()
    .build();
};
