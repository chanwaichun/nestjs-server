import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  userId: string;
  userName?: string;
  phone: string;
  password?: string;
  roleId?: string;
  userImg?: string;
  dataStatus?: string;
}

export type UserPk = "userId" | "phone";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "userName" | "password" | "roleId" | "userImg" | "dataStatus";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  userId!: string;
  userName?: string;
  phone!: string;
  password?: string;
  roleId?: string;
  userImg?: string;
  dataStatus?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init({
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roleId: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    userImg: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dataStatus: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: "1"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
          { name: "phone" },
        ]
      },
    ]
  });
  }
}
