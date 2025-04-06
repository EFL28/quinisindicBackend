import { Module } from '@nestjs/common';
import { LaLigaController } from './laliga.controller';
import { LaLigaService } from './laliga.service';

@Module({
  controllers: [LaLigaController],
  providers: [LaLigaService],
})
export class LaLigaModule {}
