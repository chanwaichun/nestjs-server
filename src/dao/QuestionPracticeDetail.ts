import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface QuestionPracticeDetailAttributes {
  id: number;
  deviceId: number;
  questionId: number;
  result: string;
}

export type QuestionPracticeDetailPk = "id";
export type QuestionPracticeDetailId = QuestionPracticeDetail[QuestionPracticeDetailPk];
export type QuestionPracticeDetailCreationAttributes = QuestionPracticeDetailAttributes;

export class QuestionPracticeDetail extends Model<QuestionPracticeDetailAttributes, QuestionPracticeDetailCreationAttributes> implements QuestionPracticeDetailAttributes {
  id!: number;
  deviceId!: number;
  questionId!: number;
  result!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof QuestionPracticeDetail {
    return QuestionPracticeDetail.init({
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
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'question_id'
    },
    result: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'question_practice_detail',
    timestamps: false
  });
  }
}
