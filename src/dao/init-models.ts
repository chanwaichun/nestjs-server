import type { Sequelize } from "sequelize";
import { Car as _Car } from "./Car";
import type { CarAttributes, CarCreationAttributes } from "./Car";
import { Label as _Label } from "./Label";
import type { LabelAttributes, LabelCreationAttributes } from "./Label";
import { QuestionPracticeDetail as _QuestionPracticeDetail } from "./QuestionPracticeDetail";
import type { QuestionPracticeDetailAttributes, QuestionPracticeDetailCreationAttributes } from "./QuestionPracticeDetail";
import { Subject as _Subject } from "./Subject";
import type { SubjectAttributes, SubjectCreationAttributes } from "./Subject";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";
import { UserProfile as _UserProfile } from "./UserProfile";
import type { UserProfileAttributes, UserProfileCreationAttributes } from "./UserProfile";

export {
  _Car as Car,
  _Label as Label,
  _QuestionPracticeDetail as QuestionPracticeDetail,
  _Subject as Subject,
  _User as User,
  _UserProfile as UserProfile,
};

export type {
  CarAttributes,
  CarCreationAttributes,
  LabelAttributes,
  LabelCreationAttributes,
  QuestionPracticeDetailAttributes,
  QuestionPracticeDetailCreationAttributes,
  SubjectAttributes,
  SubjectCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UserProfileAttributes,
  UserProfileCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Car = _Car.initModel(sequelize);
  const Label = _Label.initModel(sequelize);
  const QuestionPracticeDetail = _QuestionPracticeDetail.initModel(sequelize);
  const Subject = _Subject.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const UserProfile = _UserProfile.initModel(sequelize);


  return {
    Car: Car,
    Label: Label,
    QuestionPracticeDetail: QuestionPracticeDetail,
    Subject: Subject,
    User: User,
    UserProfile: UserProfile,
  };
}
