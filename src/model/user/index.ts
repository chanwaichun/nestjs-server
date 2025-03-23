import sequelize from 'src/util/sequelize';
import { User as RawUser, UserAttributes } from 'src/dao/User';
console.log(RawUser);
// @ts-ignore
const UserModel = RawUser.init(UserAttributes, {
  sequelize,
  tableName: 'users',
  timestamps: true, // ✅ 强制覆盖
  createdAt: 'create_time',
  updatedAt: 'update_time',
});

export { UserModel };
