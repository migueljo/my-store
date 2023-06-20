import { SequelizeStorage, Umzug } from 'umzug';
import path from 'path';

import { sequelize } from '../libs/sequelize.js';

export const umzug = new Umzug({
  context: sequelize.getQueryInterface(),
  create: { folder: path.resolve('.', 'db', 'migrations') },
  logger: console,
  migrations: { glob: path.resolve('.', 'db', 'migrations', '*.ts') },
  storage: new SequelizeStorage({ modelName: 'migrations', sequelize }),
});

umzug.runAsCLI();
