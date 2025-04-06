import { Controller, Get } from '@nestjs/common';
import { LaLigaService } from './laliga.service';

@Controller('la-liga')
export class LaLigaController {
  constructor(private readonly laligaService: LaLigaService) {}

  @Get()
  findAll() {
    return this.laligaService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.laligaService.findOne(+id);
  // }

  @Get('/current-gameweek')
  getCurrentGameweek() {
    return this.laligaService.fetchCurrentGameweek();
  }

  @Get('/events')
  getLaLigaEvents() {
    return this.laligaService.getEvents();
  }
}
