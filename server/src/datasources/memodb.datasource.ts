import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'memodb',
  connector: 'memory',
  localStorage: '',
  file: './db/memodb.json'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MemodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'memodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.memodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
