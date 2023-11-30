import { Injectable } from '@nestjs/common';
import { Sequelize, Options } from 'sequelize';

@Injectable()
export class DbService {
  sequelize: Sequelize;

  constructor() {
    const sequelizeOpts: Partial<Options> = {
      host: 'localhost',
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
    this.sequelize = sequelize;
  }
}
