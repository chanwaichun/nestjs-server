import { User } from '../entities/user.entity';
export type UserAddDto = Partial<User>;

export type UserLoginDto = Pick<User, 'userName' | 'password'>;
