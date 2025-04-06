import { Module } from '@nestjs/common';
import { PremierLeagueController } from './premier_league.controller';
import { PremierLeagueService } from './premier_league.service';

@Module({
  controllers: [PremierLeagueController],
  providers: [PremierLeagueService],
})
export class PremierLeagueModule {}
