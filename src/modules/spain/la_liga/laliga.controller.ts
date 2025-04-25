import { Controller, Get } from '@nestjs/common';
import { LaLigaService } from './laliga.service';

@Controller('la-liga')
export class LaLigaController {
  constructor(private readonly laligaService: LaLigaService) {}

  @Get('/current-gameweek')
  getLaLigaCurrentGameweek() {
    return this.laligaService.fetchLaLigaCurrentGameweek();
  }

  @Get('/events')
  getLaLigaEvents() {
    return this.laligaService.getEvents();
  }
}
