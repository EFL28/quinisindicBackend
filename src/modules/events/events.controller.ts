import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventsService.findOne(+id);
  // }

  @Get('/current-gameweek')
  getCurrentGameweek() {
    return this.eventsService.fetchCurrentGameweek();
  }

  @Get('/la-liga-events')
  getLaLigaEvents() {
    return this.eventsService.getEvents();
  }
}
