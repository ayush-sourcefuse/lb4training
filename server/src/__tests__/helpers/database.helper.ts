import {Customer, Users} from '../../models';
import {UsersRepository} from '../../repositories';
import {CustomerRepository} from '../../repositories';
import {testdb} from '../datasources/testdb.datasource';

export async function givenEmptyDatabase() {
  let customerRepo: CustomerRepository;
  let userRepo: UsersRepository;
  userRepo = new UsersRepository(testdb, async () => customerRepo);
  customerRepo = new CustomerRepository(testdb);

  await userRepo.deleteAll();
  await customerRepo.deleteAll();
}

export function givenCustomerData(data?: Partial<Customer>) {
  return Object.assign(
    {
      name: 'first',
      website: 'https://first.io',
      address: 'India',
    },
    data,
  );
}

export function givenUserData(data?: Partial<Users>) {
  return Object.assign(
    {
      name: 'michael',
      isActive: true,
      customerId: 0,
      createdAt: '2023-03-23T10:50:24.081Z',
      updatedAt: '2023-03-23T10:50:24.081Z',
    },
    data,
  );
}

export function givenCustomer() {
  let customerRepo: CustomerRepository;
  customerRepo = new CustomerRepository(testdb);
  return customerRepo.create(givenCustomerData());
}

export async function givenUser(data?: Partial<Users>) {
  let customerRepo: CustomerRepository;

  let userRepo: UsersRepository;
  userRepo = new UsersRepository(testdb, async () => customerRepo);
  return userRepo.create(givenUserData(data));
}
