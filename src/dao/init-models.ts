import type { Sequelize } from "sequelize";
import { Car as _Car } from "./car";
import type { CarAttributes, CarCreationAttributes } from "./car";
import { Label as _Label } from "./label";
import type { LabelAttributes, LabelCreationAttributes } from "./label";
import { QuestionPracticeDetail as _QuestionPracticeDetail } from "./question_practice_detail";
import type { QuestionPracticeDetailAttributes, QuestionPracticeDetailCreationAttributes } from "./question_practice_detail";
import { User as _User } from "./user";
import type { UserAttributes, UserCreationAttributes } from "./user";
import { UserProfile as _UserProfile } from "./user_profile";
import type { UserProfileAttributes, UserProfileCreationAttributes } from "./user_profile";

export {
  _Car as Car,
  _Label as Label,
  _QuestionPracticeDetail as QuestionPracticeDetail,
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
  UserAttributes,
  UserCreationAttributes,
  UserProfileAttributes,
  UserProfileCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Car = _Car.initModel(sequelize);
  const Label = _Label.initModel(sequelize);
  const QuestionPracticeDetail = _QuestionPracticeDetail.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const UserProfile = _UserProfile.initModel(sequelize);


  return {
    Car: Car,
    Label: Label,
    QuestionPracticeDetail: QuestionPracticeDetail,
    User: User,
    UserProfile: UserProfile,
  };
}
