import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SubjectAttributes {
  subjectId: string;
  subjectType: string;
  subjectName: string;
  creatorName?: string;
  creatorId?: string;
  createTime: Date;
  updateTime: Date;
}

export type SubjectPk = 'subjectId';
export type SubjectId = Subject[SubjectPk];
export type SubjectOptionalAttributes = 'creatorName' | 'creatorId';
export type SubjectCreationAttributes = Optional<
  SubjectAttributes,
  SubjectOptionalAttributes
>;

export class Subject
  extends Model<SubjectAttributes, SubjectCreationAttributes>
  implements SubjectAttributes
{
  subjectId!: string;
  subjectType!: string;
  subjectName!: string;
  creatorName?: string;
  creatorId?: string;
  createTime!: Date;
  updateTime!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Subject {
    return Subject.init(
      {
        subjectId: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
          field: 'subject_id',
        },
        subjectType: {
          type: DataTypes.STRING(20),
          allowNull: false,
          field: 'subject_type',
        },
        subjectName: {
          type: DataTypes.STRING(20),
          allowNull: false,
          field: 'subject_name',
        },
        creatorName: {
          type: DataTypes.STRING(20),
          allowNull: true,
          field: 'creator_name',
        },
        creatorId: {
          type: DataTypes.STRING(20),
          allowNull: true,
          field: 'creator_id',
        },
        createTime: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'create_time',
        },
        updateTime: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'update_time',
        },
      },
      {
        sequelize,
        tableName: 'subject',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'subject_id' }],
          },
        ],
      },
    );
  }
}
