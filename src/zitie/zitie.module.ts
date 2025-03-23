import { Module } from '@nestjs/common';
import { ZitieService } from './zitie.service';
import { ZitieController } from './zitie.controller';
import { ThirdPartyModule } from '../thirdParty/thirdParty.module';

@Module({
  imports: [ThirdPartyModule],
  controllers: [ZitieController],
  providers: [ZitieService],
})
export class ZitieModule {}
