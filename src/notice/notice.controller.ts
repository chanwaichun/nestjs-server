import { Controller } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class SubjectController {
  constructor(private readonly noticeService: NoticeService) {}
}
