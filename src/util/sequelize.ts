import { Sequelize, Options } from 'sequelize';

const sequelizeOpts: Partial<Options> = {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true,
  },
};
const sequelize = new Sequelize(
  'report_database',
  'root',
  '123456789',
  sequelizeOpts,
);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default sequelize;
