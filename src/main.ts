import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/httpexception/httpexception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './filters/allexceptionfilter/allexceptionfilter.filter';
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('网络运维接口文档').setDescription('nest').setVersion('1.0').addTag('BBBC').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  // 全局管道
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 全局过滤器
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors();
  // app.useWebSocketAdapter(new WsAdapter(app))
  await app.listen(3000, '0.0.0.0');

  const httpServer = await app.getUrl();
  console.log(httpServer);
}
bootstrap();
