import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {DataSource, juggler} from '@loopback/repository';

const config = {
  name: 'RestConnect',
  connector: 'rest',
  baseURL: 'http://localhost:8000',
  crud: false,
  operations: [
    {
      template: {
        method: 'GET',
        url: 'http://localhost:8000/users/count',
        headers: {
          accepts: 'application/json',
          'content-type': 'application/json',
        },
        query: {},
        responsePath: '$',
      },
      functions: {
        count: [],
      },
    },
    {
      template: {
        method: 'POST',
        url: 'http://localhost:8000/users/',
        headers: {
          accepts: 'application/json',
          'content-type': 'application/json',
        },
        responsePath: '$',
        body: {
          name: '{name:string}',
          isActive: '{isActive:boolean}',
          createdAt: '{createdAt:string}',
          updatedAt: '{updatedAt:string}',
          customerId: '{customerId:number}',
        },
      },
      functions: {
        createUser: ['name', 'isActive', 'customerId', 'createdAt', 'updatedAt'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RestConnectDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'RestConnect';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.RestConnect', {optional: true})
    dsConfig: object = config,
  ) {
    console.log('init data source');
    super(dsConfig);
  }
}
