import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

import type { CustomerType } from './customers.schema.js';
import { CustomerModel } from './customers.model.js';

export class CustomersService {
  async create(customer: Omit<CustomerType, 'id'>): Promise<CustomerType> {
    const userAlreadyHasCustomer = await CustomerModel.findOne({
      where: { userId: customer.userId },
    });

    if (userAlreadyHasCustomer) {
      throw Boom.conflict(`User ${customer.userId} already has a customer`);
    }

    const createdCustomer = await CustomerModel.create({
      ...customer,
      id: uuid(),
    });
    return createdCustomer.toJSON();
  }

  async findAll(): Promise<CustomerModel[]> {
    const response = await CustomerModel.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id: string): Promise<CustomerModel> {
    const customer = await CustomerModel.findOne({ where: { id } });
    if (!customer) {
      throw Boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(
    id: string,
    changes: Partial<CustomerType>,
  ): Promise<CustomerType> {
    const customerToUpdate = await this.findOne(id);
    const updatedCustomer = await customerToUpdate.update(changes);
    return updatedCustomer.toJSON();
  }

  async delete(id: string): Promise<CustomerType> {
    const customerToDelete = await this.findOne(id);
    await customerToDelete.destroy();
    return customerToDelete.toJSON();
  }
}
