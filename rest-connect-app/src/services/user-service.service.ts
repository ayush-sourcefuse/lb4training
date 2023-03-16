import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {OpenApiDsDataSource, RestConnectDataSource} from '../datasources';

export interface UserCountResponse {
  count: number;
}

export interface UserService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  UsersController_count(): Promise<UserCountResponse>;
  UsersController_create(user: {
    name: string;
    isActive: boolean;
    customerId: number;
    createdAt: string;
    updatedAt: string;
  }): Promise<any>;
}

export class UserServiceProvider implements Provider<UserService> {
  constructor(
    // RestConnect must match the name property in the datasource json file
    @inject('datasources.OpenApiDs')
    protected dataSource: OpenApiDsDataSource = new OpenApiDsDataSource(),
  ) {}

  value(): Promise<UserService> {
    return getService(this.dataSource);
  }
}
