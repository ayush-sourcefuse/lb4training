import {Provider} from '@loopback/core';
import {createLogger, format, Logger, transports} from 'winston';

export interface LoggerMethods {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
  debug(msg: string): void;
}

export class WinstonLogger implements LoggerMethods {
  logger: Logger;

  constructor() {
    this.logger = createLogger({
      transports: [new transports.Console()],
      format: format.json(),
      level: 'info',
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
  error(message: string): void {
    this.logger.error(message);
  }
  debug(message: string): void {
    this.logger.debug(message);
  }
}

export class LoggerProvider implements Provider<LoggerMethods> {
  logger: LoggerMethods;
  constructor() {
    this.logger = new WinstonLogger();
  }
  value() {
    return this.logger;
  }
}
