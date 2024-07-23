import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserProfileAttributes {
  id: number;
  deviceId: number;
  gender: string;
  age?: number;
  university: string;
  gpa?: number;
  activeDaysWithin30?: number;
  questionCnt?: number;
  answerCnt?: number;
}

export type UserProfilePk = "id";
export type UserProfileId = UserProfile[UserProfilePk];
export type UserProfileOptionalAttributes = "age" | "gpa" | "activeDaysWithin30" | "questionCnt" | "answerCnt";
export type UserProfileCreationAttributes = Optional<UserProfileAttributes, UserProfileOptionalAttributes>;

export class UserProfile extends Model<UserProfileAttributes, UserProfileCreationAttributes> implements UserProfileAttributes {
  id!: number;
  deviceId!: number;
  gender!: string;
  age?: number;
  university!: string;
  gpa?: number;
  activeDaysWithin30?: number;
  questionCnt?: number;
  answerCnt?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof UserProfile {
    return UserProfile.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'device_id'
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
    activeDaysWithin30: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'active_days_within_30'
    },
    questionCnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'question_cnt'
    },
    answerCnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'answer_cnt'
    }
  }, {
    sequelize,
    tableName: 'user_profile',
    timestamps: false
  });
  }
}
