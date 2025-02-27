import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ThirdPartyService } from './thirdParty.service';
import { ThirdPartyController } from './thirdParty.controller';

@Module({
  imports: [forwardRef(() => HttpModule)],
  controllers: [ThirdPartyController],
  providers: [ThirdPartyService],
  exports: [ThirdPartyService],
})
export class ThirdPartyModule {}
