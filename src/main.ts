import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/httpexception/httpexception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './filters/allexceptionfilter/allexceptionfilter.filter';
import { WsAdapter } from '@nestjs/platform-ws';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
