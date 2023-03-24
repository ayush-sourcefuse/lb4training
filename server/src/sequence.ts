import {Context, inject} from '@loopback/core';
import {
  InvokeMiddleware,
  InvokeMiddlewareOptions,
  MiddlewareSequence,
  RequestContext
} from '@loopback/rest';
import moment from 'moment';
import {LoggerMethods} from './components/winston-logger/logger.provider';

export class MySequence extends MiddlewareSequence {
  constructor(
    context: Context,
    invokeMiddleware: InvokeMiddleware,
    options: InvokeMiddlewareOptions,
    @inject('logger.log') private logger: LoggerMethods,
  ) {
    super(context, invokeMiddleware, options);
  }

  async handle(context: RequestContext): Promise<void> {
    await this.invokeMiddleware(context, this.options);
  }
}

/*
export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.INVOKE_MIDDLEWARE)
    readonly invokeMiddleware: InvokeMiddleware,
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject('logger.log') private logger: LoggerMethods,
  ) {}

  async handle(context: RequestContext): Promise<void> {
    const startTime = Date.now();
    try {
      const startTimeFormatted = moment(startTime).format('DD-MM-YY HH:mm:ss');
      const {request, response} = context;
      this.logger.info(
        `Request: ${request.method}=>${request.path}, Start Time: ${startTimeFormatted}, User-Agent: ${request.headers['user-agent']}, IP: ${request.ip}`,
      );
      const finished = await this.invokeMiddleware(context);
      if (finished) {
        return;
      }
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);

      this.send(response, result);
    } catch (error) {
      this.logger.error(
        `Error in request to  ${context.request.path}. Error: ${JSON.stringify(
          error,
        )}`,
      );
      this.reject(context, error);
    } finally {
      this.logger.info(
        `Request: ${context.request.method}=>${
          context.request.path
        } Completed in ${Date.now() - startTime}ms`,
      );
    }
  }
}
*/
