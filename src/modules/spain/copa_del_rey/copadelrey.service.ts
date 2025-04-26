import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import {
  LA_LIGA_URL_PUBLIC_SERVICE,
  LA_LIGA_URL_WEBVIEW,
  LANGUAGE_AND_KEY_PUBLIC_SERVICE,
  LANGUAGE_AND_KEY_WEBVIEW,
} from '../../../core/config';
import {
  currentGameweek,
  GameweekResponse,
} from '../types/currentGameweek.types';
import { Match, Matches } from '../types/laliga.types';
import { addPointsFlag, normalizeTeamCrests } from '../utils/spain.utils';

@Injectable()
export class CopaDelReyService {
  // private supabase: SupabaseClient;
  private redis: Redis;

  constructor() {
    // const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    // const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
    const redis = new Redis(6379, '129.153.6.63');

    // if (!supabaseUrl || !supabaseKey) {
    //   throw new Error(
    //     'Las variables SUPABASE_URL o SUPABASE_KEY no están definidas.',
    //   );
    // }

    // this.supabase = createClient(supabaseUrl, supabaseKey);
    this.redis = redis;
  }

  public async fetchCopaDelReyCurrentGameweek(): Promise<GameweekResponse> {
    try {
      const url = `${LA_LIGA_URL_PUBLIC_SERVICE}/copa-del-rey-2024/current-gameweek?${LANGUAGE_AND_KEY_PUBLIC_SERVICE}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = (await response.json()) as currentGameweek;

      const gameweek = data.gameweek;

      return {
        data: {
          gameweekName: gameweek.name, // ej. "Cuartos", "Semifinales - Ida", "Semifinales - Vuelta"
          gameweek: gameweek.week, // ej. 1, 2, 3, 4
          shortname: gameweek.shortname, // ej. "1/4", "1/2", "1/2", "F"
        },
      };
    } catch (error) {
      console.error('Error fetching current gameweek:', error);
      throw new Error('Failed to fetch current gameweek');
    }
  }

  public async fetchCopaDelReyEvents() {
    const {
      data: { gameweek },
    } = await this.fetchCopaDelReyCurrentGameweek();

    const url = `${LA_LIGA_URL_WEBVIEW}/copa-del-rey-2024/week/${gameweek}/matches?${LANGUAGE_AND_KEY_WEBVIEW}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = (await response.json()) as Matches;

      return { matches: data.matches, gameweek };
    } catch (error) {
      console.error('Error fetching Copa del Rey events:', error);
      throw new Error('Failed to fetch Copa del Rey events');
    }
  }

  getEvents = async () => {
    // const { data, error } = await this.supabase.from('events').select('*');
    // console.log('Data from Supabase:', data);

    // // si no hay datos se recogen los eventos de la API y se guardan en la base de datos

    // if (error) {
    //   console.error('Error fetching events from Supabase:', error);
    //   throw new Error('Failed to fetch events from Supabase');
    // }

    // if (data.length === 0) {
    const { matches, gameweek } = await this.fetchCopaDelReyEvents();
    const normalizedEvents = normalizeTeamCrests(matches);
    const eventsWithPointsFlag = addPointsFlag(normalizedEvents as Match[]);

    const eventsOK = eventsWithPointsFlag.map((event) => ({
      ...event,
      competition_id: 3,
      sport_id: 1,
      gameweek,
    }));

    // // Guardar los eventos en la base de datos
    // const { error: insertError } = await this.supabase
    //   .from('events')
    //   .insert(eventsOK);

    // if (insertError) {
    //   console.error('Error inserting events into Supabase:', insertError);
    //   throw new Error('Failed to insert events into Supabase');
    // }

    return {
      matches: eventsOK,
    };
    // }
  };

  getRedis = async () => {
    const redis_result = await this.redis.get('copa_del_rey', (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result); // Printa el array de aprtidos
      }
    });

    const parsed = JSON.parse(redis_result as string) as Match[];
    console.log('Parsed Redis value:', parsed);

    return parsed;
  };

  getEventsCron = async () => {
    const { matches, gameweek } = await this.fetchCopaDelReyEvents();
    const normalizedEvents = normalizeTeamCrests(matches);
    const eventsWithPointsFlag = addPointsFlag(normalizedEvents as Match[]);

    const eventsOK = eventsWithPointsFlag.map((event) => ({
      ...event,
      competition_id: 3,
      sport_id: 1,
      gameweek,
    }));

    return eventsOK;
  };
}
