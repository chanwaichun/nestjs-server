import { Injectable } from '@nestjs/common';
import { Sequelize, Options } from 'sequelize';

@Injectable()
export class DbService {
  sequelize: Sequelize;

  constructor() {
    const sequelizeOpts: Partial<Options> = {
      host: '8.138.37.136',
      dialect: 'mysql',
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
    this.sequelize = sequelize;
  }
}
