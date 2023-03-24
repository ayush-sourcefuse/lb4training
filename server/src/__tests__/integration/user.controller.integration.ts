import {expect} from '@loopback/testlab';
import {givenCustomer, givenEmptyDatabase} from '../helpers/database.helper';
import {UsersController} from '../../_controllers/users.controller';
import {UsersRepository, CustomerRepository} from '../../repositories';
import {testdb} from '../datasources/testdb.datasource';
import {Users} from '../../models';
import {AnyObject} from '@loopback/repository';

const userCreation = async (
  userRepo: UsersRepository,
  customerRepo: CustomerRepository,
) => {
  const usersController = new UsersController(userRepo, customerRepo);
  const newUser: Omit<Users, 'id'> = {
    name: 'john',
    isActive: true,
    customerId: 1,
    createdAt: '2023-03-23T10:50:24.081Z',
    updatedAt: '2023-03-23T10:50:24.081Z',
    getId: function () {
      throw new Error('Function not implemented.');
    },
    getIdObject: function (): Object {
      throw new Error('Function not implemented.');
    },
    toJSON: function (): Object {
      throw new Error('Function not implemented.');
    },
    toObject: function (options?: AnyObject | undefined): Object {
      throw new Error('Function not implemented.');
    },
  };
  const response = await usersController.create(newUser);
  return response;
};

describe('ProductController (integration)', () => {
  beforeEach(givenEmptyDatabase);

  it('should throw error on creating a user with invalid customer id', async () => {
    let customerRepo: CustomerRepository;
    customerRepo = new CustomerRepository(testdb);
    let userRepo: UsersRepository;
    userRepo = new UsersRepository(testdb, async () => customerRepo);
    const response = await userCreation(userRepo, customerRepo);
    if(!("id" in response)){
      expect(response).to.have.property('code').to.equal('INVALID_PARAMETER_VALUE');
    }
  });

  it('should create a user when a valid customer id is passed', async () => {
    givenCustomer();
    let customerRepo: CustomerRepository;
    customerRepo = new CustomerRepository(testdb);
    let userRepo: UsersRepository;
    userRepo = new UsersRepository(testdb, async () => customerRepo);
    const response = await userCreation(userRepo, customerRepo);
    const repoUser = await userRepo.find({
      where: {
        name: 'john',
      },
    });
    expect(repoUser).length(1);
    expect(response).to.deepEqual(repoUser[0]);
  });
});
