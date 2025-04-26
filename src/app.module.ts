import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierLeagueModule } from './modules/premier_league/premier_league.module';
import { CopaDelReyModule } from './modules/spain/copa_del_rey/copadelrey.module';
import { LaLigaModule } from './modules/spain/la_liga/laliga.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LaLigaModule,
    CopaDelReyModule,
    PremierLeagueModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
