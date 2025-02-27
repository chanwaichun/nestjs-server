import { Sequelize, Options } from 'sequelize';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: `env/.env.${process.env.NODE_ENV}` });
console.log(process.env.DATABASE_HOST);
const sequelizeOpts: Partial<Options> = {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  port: Number(process.env.DATABASE_PORT),
  dialectOptions: {
    multipleStatements: true,
  },
};
const sequelize = new Sequelize(
  'report_database',
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  sequelizeOpts,
);

try {

  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default sequelize;
