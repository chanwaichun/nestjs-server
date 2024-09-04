import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CarAttributes {
  userId?: string;
  userName?: string;
  car?: string;
}

export type CarOptionalAttributes = 'userId' | 'userName' | 'car';
export type CarCreationAttributes = Optional<
  CarAttributes,
  CarOptionalAttributes
>;

export class Car
  extends Model<CarAttributes, CarCreationAttributes>
  implements CarAttributes
{
  userId?: string;
  userName?: string;
  car?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Car {
    return Car.init(
      {
        userId: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        userName: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        car: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'car',
        timestamps: false,
      },
    );
  }
}
