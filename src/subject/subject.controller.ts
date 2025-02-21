import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('科目管理')
@ApiBearerAuth()
@Controller('/api/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {
  }
  @ApiOperation({ tags: ['获取用户列表'], description: '获取用户列表' })
  @Post('/create')
  create() {
    return this.subjectService.create();
  }

  @Get('/get')
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: any) {
    return this.subjectService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
