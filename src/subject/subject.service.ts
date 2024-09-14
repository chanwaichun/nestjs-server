import { Injectable } from '@nestjs/common';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from '../dao/init-models';
import sequelize from '../util/sequelize';

@Injectable()
export class SubjectService {
  private db;
  constructor() {
    this.db = Subject.initModel(sequelize);
  }

  create() {
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
