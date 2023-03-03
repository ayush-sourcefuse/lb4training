import {Component, ProviderMap} from '@loopback/core';
import {LoggerProvider} from './logger.provider';

export class LoggerComponent implements Component {
  providers: ProviderMap = {};
  constructor() {
    this.providers = {
      'logger.log': LoggerProvider,
      // 'logger.info': LoggerProvider,
      // 'logger.error': LoggerProvider,
      // 'logger.warn': LoggerProvider,
      // 'logger.debug': LoggerProvider,
    };
  }
}
