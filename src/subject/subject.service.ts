import { Injectable } from '@nestjs/common';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from 'src/dao/Subject';
import sequelize from '../util/sequelize';
import { UserService } from '../user/user.service';

@Injectable()
export class SubjectService {
  private db;

  constructor(private readonly userService: UserService) {
    this.db = Subject.initModel(sequelize);
    this.userService = userService;
  }

  create() {
    console.log(this.userService.test());
    return 'This action adds a new subject';
  }

  findAll() {
    return `This action returns all subject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
