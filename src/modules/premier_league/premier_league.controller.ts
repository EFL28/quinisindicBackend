import { Controller, Get } from '@nestjs/common';
import { PremierLeagueService } from './premier_league.service';

@Controller('premier-league')
export class PremierLeagueController {
  constructor(private readonly premierLeagueService: PremierLeagueService) {}

  @Get('/events')
  getPremierLeagueEvents() {
    return this.premierLeagueService.fecthPremierLeagueEvents();
  }
}
