import type { Sequelize } from 'sequelize';
import { Label as _Label } from './Label';
import type { LabelAttributes, LabelCreationAttributes } from './Label';
import { Subject as _Subject } from './Subject';
import type { SubjectAttributes, SubjectCreationAttributes } from './Subject';
import { User as _User } from './User';
import type { UserAttributes, UserCreationAttributes } from './User';

export { _Label as Label, _Subject as Subject, _User as User };

export type {
  LabelAttributes,
  LabelCreationAttributes,
  SubjectAttributes,
  SubjectCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Label = _Label.initModel(sequelize);
  const Subject = _Subject.initModel(sequelize);
  const User = _User.initModel(sequelize);

  return {
    Label: Label,
    Subject: Subject,
    User: User,
  };
}
