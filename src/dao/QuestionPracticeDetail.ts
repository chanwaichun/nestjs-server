import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface QuestionPracticeDetailAttributes {
  id: number;
  device_id: number;
  question_id: number;
  result: string;
}

export type QuestionPracticeDetailPk = "id";
export type QuestionPracticeDetailId = QuestionPracticeDetail[QuestionPracticeDetailPk];
export type QuestionPracticeDetailCreationAttributes = QuestionPracticeDetailAttributes;

export class QuestionPracticeDetail extends Model<QuestionPracticeDetailAttributes, QuestionPracticeDetailCreationAttributes> implements QuestionPracticeDetailAttributes {
  id!: number;
  device_id!: number;
  question_id!: number;
  result!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof QuestionPracticeDetail {
    return QuestionPracticeDetail.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
