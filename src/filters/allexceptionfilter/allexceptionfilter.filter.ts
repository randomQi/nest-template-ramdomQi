import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import * as requestIp from 'request-ip'
import { ValidationError } from "class-validator";
import { ValidationPipeOptions } from "@nestjs/common/pipes/validation.pipe";
@Catch()
export class AllExceptionFilter implements ExceptionFilter  {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
  }
  catch(exception: any, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message =  exception!.response.message
    // if (exception instanceof TypeORMError) {
    //   message = exception.message
    // }
    // if (exception instanceof ValidationPipeOptions) {
    //   message =  exception!.response.message
    // }
    const responseBody = {
      title: '统一制定的httpException异常响应的数据结构体',
      statusCode: httpStatus,
      exception: exception['name'],
      ip: requestIp.getClientIp(ctx.getRequest()),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
