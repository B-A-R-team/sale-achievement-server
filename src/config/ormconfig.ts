import { ConnectionOptions } from 'typeorm';
import { DB_PASSWORD, HOST } from './sensitive';

const ormconfig: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: HOST,
  port: 3306,
  username: 'root',
  password: DB_PASSWORD,
  database: 'sale_achievement',
  logging: false,
  synchronize: false,
  entities: ['src/model/*.ts'],
  cli: {
    entitiesDir: 'src/model',
  },
};

export default ormconfig;
