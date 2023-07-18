import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./filters/httpexception/httpexception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000,'0.0.0.0');
  app.useGlobalFilters(new HttpExceptionFilter)
  let httpServer =  await app.getUrl();
  console.log(httpServer);
}
bootstrap();
