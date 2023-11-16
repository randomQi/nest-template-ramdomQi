import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const httpArgumentsHost = host.switchToHttp();
    // 获取请求与响应对象
    const request = httpArgumentsHost.getRequest();
    const response = httpArgumentsHost.getResponse();
    // 获取异常状态码
    const status = exception.getStatus();
    console.log('-----------------------------------------');
    // 定制统一异常响应数据结构体
    response.status(status).json({
      title: '统一制定的httpException异常响应的数据结构体',
      code: status,
      timestamp: new Date().toISOString(),
      message: exception.message || exception.name,
    });
  }
}
