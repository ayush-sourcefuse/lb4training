import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RestConnectDataSource} from '../datasources';

export interface UserCountResponse {
  count: number;
}

export interface UserService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  count(): Promise<UserCountResponse>;
  createUser(
    name: string,
    isActive: boolean,
    customerId: number,
    createdAt: string,
    updatedAt: string,
  ): Promise<any>;
}

export class UserServiceProvider implements Provider<UserService> {
  constructor(
    // RestConnect must match the name property in the datasource json file
    @inject('datasources.RestConnect')
    protected dataSource: RestConnectDataSource = new RestConnectDataSource(),
  ) {}

  value(): Promise<UserService> {
    return getService(this.dataSource);
  }
}
