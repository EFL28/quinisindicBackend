import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PREMIER_LEAGUE_URL } from 'src/core/config';
import { PremierLeagueResponse } from './types/premierleague.types';

@Injectable()
export class PremierLeagueService {
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Las variables SUPABASE_URL o SUPABASE_KEY no están definidas.',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  findAll() {
    return `This action returns all events`;
  }

  public async fecthPremierLeagueEvents(): Promise<any> {
    const url = `${PREMIER_LEAGUE_URL}/fixtures?statuses=U,L,C,A&pageSize=10&page=0&gameweeks=18420&altIds=true&fast=false`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: PremierLeagueResponse = await response.json();
      const content = data.content;

      return content;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data from the Premier League API');
    }
  }
}
