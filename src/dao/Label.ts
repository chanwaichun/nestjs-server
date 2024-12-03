import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LabelAttributes {
  userId?: string;
  value?: string;
  id?: string;
}

export type LabelPk = 'id';
export type LabelId = Label[LabelPk];
export type LabelOptionalAttributes = 'userId' | 'value' | 'id';
export type LabelCreationAttributes = Optional<
  LabelAttributes,
  LabelOptionalAttributes
>;

export class Label
  extends Model<LabelAttributes, LabelCreationAttributes>
  implements LabelAttributes
{
  userId?: string;
  value?: string;
  id?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Label {
    return Label.init(
      {
        userId: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        value: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        id: {
          type: DataTypes.STRING(20),
          allowNull: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: 'label',
        timestamps: false,
      },
    );
  }
}
