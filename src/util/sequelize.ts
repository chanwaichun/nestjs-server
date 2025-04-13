import { Sequelize, Options } from 'sequelize';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: `env/.env.${process.env.NODE_ENV}` });
console.log(process.env.DATABASE_HOST);
const sequelizeOpts: Partial<Options> = {
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
  timezone: '+08:00', // 东八区时间
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  port: Number(process.env.DATABASE_PORT),
  dialectOptions: {
    charset: 'utf8mb4',
    multipleStatements: true,
  },
  pool: {
    max: 10, // 最大连接数
    min: 1, // 最小连接数
    acquire: 30000, // 获取连接的最长等待时间 (ms)
    idle: 10000, // 连接空闲多久后释放 (ms)
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
