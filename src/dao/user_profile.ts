import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserProfileAttributes {
  id: number;
  device_id: number;
  gender: string;
  age?: number;
  university: string;
  gpa?: number;
  active_days_within_30?: number;
  question_cnt?: number;
  answer_cnt?: number;
}

export type UserProfilePk = "id";
export type UserProfileId = UserProfile[UserProfilePk];
export type UserProfileOptionalAttributes = "age" | "gpa" | "active_days_within_30" | "question_cnt" | "answer_cnt";
export type UserProfileCreationAttributes = Optional<UserProfileAttributes, UserProfileOptionalAttributes>;

export class UserProfile extends Model<UserProfileAttributes, UserProfileCreationAttributes> implements UserProfileAttributes {
  id!: number;
  device_id!: number;
  gender!: string;
  age?: number;
  university!: string;
  gpa?: number;
  active_days_within_30?: number;
  question_cnt?: number;
  answer_cnt?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof UserProfile {
    return UserProfile.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    university: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    gpa: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    active_days_within_30: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    question_cnt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    answer_cnt: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_profile',
    timestamps: false
  });
  }
}
