import { Module } from '@nestjs/common';
import { CopaDelReyController } from './copadelrey.controller';
import { CopaDelReyService } from './copadelrey.service';

@Module({
  controllers: [CopaDelReyController],
  providers: [CopaDelReyService],
})
export class CopaDelReyModule {}
