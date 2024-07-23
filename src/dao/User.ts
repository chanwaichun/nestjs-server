import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  userId: string;
  userName?: string;
  phone: string;
  password?: string;
  roleId?: string;
  userImg?: string;
  createTime?: Date;
  updateTime?: Date;
}

export type UserPk = "userId";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "userName" | "password" | "roleId" | "userImg" | "createTime" | "updateTime";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  userId!: string;
  userName?: string;
  phone!: string;
  password?: string;
  roleId?: string;
  userImg?: string;
  createTime?: Date;
  updateTime?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init({
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'user_name'
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roleId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'role_id'
    },
    userImg: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'user_img'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'create_time'
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "\r\n",
      field: 'update_time'
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
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
