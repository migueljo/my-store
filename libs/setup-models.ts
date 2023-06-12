import { Sequelize } from 'sequelize';
import { UserModel, UserModelSchema } from '../api/users/users.model.js';

export function setupModels(sequelize: Sequelize): void {
  UserModel.init(UserModelSchema, UserModel.config(sequelize));
  // TODO: Create Categories model
  // TODO: Create Products model
}
