import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException } from "@nestjs/common";
import { FastifyReply } from "fastify";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();

    // Ensure response has status method
    if (response.status && typeof response.status === 'function') {
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : new InternalServerErrorException().getStatus();

      let message = 'Internal Server Error';

      if (exception instanceof HttpException) {
        const errorResponse = exception.getResponse();
        message = typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any).message || message;
      } else if (exception?.message) {
        message = exception.message;
      }

      const errorResponseObject = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request?.url,
        message,
      };

      console.error(`[${errorResponseObject.timestamp}] Error:`, errorResponseObject);

      response.status(status).send(errorResponseObject);
    } else {
      // Handle case where response doesn't have status method
      console.error('Invalid response object:', response);
    }
  }
}
