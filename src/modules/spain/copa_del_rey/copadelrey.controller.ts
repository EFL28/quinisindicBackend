import { Controller, Get } from '@nestjs/common';
import { CopaDelReyService } from './copadelrey.service';

@Controller('copa-del-rey')
export class CopaDelReyController {
  constructor(private readonly copaService: CopaDelReyService) {}

  @Get('/current-gameweek')
  getCopaDelReyCurrentGameweek() {
    return this.copaService.fetchCopaDelReyCurrentGameweek();
  }

  @Get('/events')
  getCopaDelReyEvents() {
    return this.copaService.getEvents();
  }
}
