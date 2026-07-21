import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse } from 'src/common/exceptions/application.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException
      ? exception.getResponse()
      : null;

    let message: string | string[] = 'Internal server error';
    let error = 'Internal Server Error';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const responseObject = exceptionResponse as Record<string, unknown>;

      message =
        (responseObject.message as string | string[]) ??
        'Unexpected error occurred';

      error =
        (responseObject.error as string) ??
        HttpStatus[status] ??
        'Error';
    }

    const payload: ApiErrorResponse = {
      success: false,
      statusCode: status,
      message,
      error,
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(payload);
  }
}