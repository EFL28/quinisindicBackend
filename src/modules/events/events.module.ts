import { Module } from '@nestjs/common';
import { CopaDelReyService } from '../spain/copa_del_rey/copadelrey.service';
import { LaLigaService } from '../spain/la_liga/laliga.service';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, LaLigaService, CopaDelReyService],
})
export class EventsModule {}
