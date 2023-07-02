import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

import { OrderModel } from './orders.model.js';
import { OrderProductType, OrderType } from './orders.schema.js';
import { OrderProductModel } from './order-product.model.js';

export class OrdersService {
  async create(product: Omit<OrderType, 'id'>): Promise<OrderType> {
    const newItem = await OrderModel.create({
      ...product,
      id: uuid(),
    });

    return newItem.toJSON();
  }

  async findAll(): Promise<OrderType[]> {
    const items = await OrderModel.findAll();
    return items.map((product) => product.toJSON());
  }

  async findOne(id: string): Promise<OrderModel> {
    const item = await OrderModel.findOne({
      where: { id },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        {
          association: 'products',
        },
      ],
    });
    const itemJSON = item?.toJSON();

    if (!itemJSON) {
      throw Boom.notFound('Product not found');
    }

    return item;
  }

  async addProduct(product: OrderProductType): Promise<OrderProductType> {
    const productId = uuid();
    const newProduct = await OrderProductModel.create({
      ...product,
      id: productId,
    });
    console.log('Hello', newProduct.toJSON());
    return newProduct.toJSON();
  }

  async update(id: string, changes: Partial<OrderType>): Promise<OrderType> {
    const itemToUpdate = await this.findOne(id);
    const itemUpdated = await itemToUpdate.update(changes);
    return itemUpdated.toJSON();
  }

  async delete(id: string): Promise<OrderType> {
    const itemToDelete = await this.findOne(id);
    await itemToDelete.destroy();
    return itemToDelete.toJSON();
  }
}
