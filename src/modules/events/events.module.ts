import { Module } from '@nestjs/common';
import { LaLigaController } from './events.controller';
import { LaLigaService } from './events.service';

@Module({
  controllers: [LaLigaController],
  providers: [LaLigaService],
})
export class LaLigaModule {}
