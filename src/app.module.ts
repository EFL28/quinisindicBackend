import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaLigaModule } from './modules/la_liga/laliga.module';
import { PremierLeagueModule } from './modules/premier_league/premier_league.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LaLigaModule,
    PremierLeagueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
