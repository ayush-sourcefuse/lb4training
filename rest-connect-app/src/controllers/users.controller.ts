// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, post, requestBody} from '@loopback/rest';
import {UserCountResponse, UserService} from '../services';

// import {inject} from '@loopback/core';

export class UsersController {
  constructor(
    @inject('services.UserService')
    protected userService: UserService,
  ) {}

  @get('/users/count')
  async countUsers(): Promise<UserCountResponse> {
    return this.userService.count();
  }

  @post('/users')
  async create(
    @requestBody() user: {name: string; isActive: boolean; customerId: number},
  ): Promise<any> {
    const {name, isActive, customerId} = user;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    return this.userService.createUser(
      name,
      isActive,
      customerId,
      createdAt,
      updatedAt,
    );
  }
}
