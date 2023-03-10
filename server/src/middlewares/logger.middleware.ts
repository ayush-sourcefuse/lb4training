import {
  inject,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {HttpErrors, Middleware, MiddlewareContext} from '@loopback/rest';
import moment from 'moment';
import {LoggerMethods} from '../components/winston-logger/logger.provider';

export class LoggerMiddleware implements Provider<Middleware> {
  constructor(@inject('logger.log') private logger: LoggerMethods) {}

  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    context: MiddlewareContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      const startTime = Date.now();
      const startTimeFormatted = moment(startTime).format('DD-MM-YY HH:mm:ss');
      const {request} = context;
      this.logger.info(
        `Request: ${request.method}=>${request.url}, Start Time: ${startTimeFormatted}, User-Agent: ${request.headers['user-agent']}, IP: ${request.ip}`,
      );
      const result = await next();
      this.logger.info(
        `Request: ${context.request.method}=>${
          context.request.url
        } Completed in ${Date.now() - startTime}ms`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Error in request to  ${context.request.url}. Error: ${JSON.stringify(
          error,
        )}`,
      );

      throw error;
    }
  }
}
