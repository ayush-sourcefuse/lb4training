import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Users, UsersRelations, Customer} from '../models';
import {CustomerRepository} from './customer.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly parentCustomer: BelongsToAccessor<Customer, typeof Users.prototype.id>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,) {
    super(Users, dataSource);
    this.parentCustomer = this.createBelongsToAccessorFor('parentCustomer', customerRepositoryGetter,);
    this.registerInclusionResolver('parentCustomer', this.parentCustomer.inclusionResolver);
  }
}
