import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CopaDelReyService } from '../spain/copa_del_rey/copadelrey.service';
import { LaLigaService } from '../spain/la_liga/laliga.service';

@Injectable()
export class EventsService {
  private redis: Redis;
  constructor(
    private laLigaService: LaLigaService,
    private copaService: CopaDelReyService,
  ) {
    const redis = new Redis(6379, '129.153.6.63');
    this.laLigaService = laLigaService;
    this.copaService = copaService;
    this.redis = redis;
  }

  async getEvents() {
    const redis_laliga = await this.laLigaService.getRedis();
    const redis_copa = await this.copaService.getRedis();

    return {
      ...redis_laliga,
      ...redis_copa,
    };
  }
}
