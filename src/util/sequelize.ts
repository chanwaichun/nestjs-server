import { Sequelize, Options } from 'sequelize';

const sequelizeOpts: Partial<Options> = {
  host: '8.138.37.136',
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    multipleStatements: true,
  },
};
const sequelize = new Sequelize(
  'report_database',
  'chenweijun',
  'Cwj19970802',
  sequelizeOpts,
);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default sequelize;
