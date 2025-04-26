import { Injectable } from '@nestjs/common';
import {
  LA_LIGA_URL_PUBLIC_SERVICE,
  LA_LIGA_URL_WEBVIEW,
  LANGUAGE_AND_KEY_PUBLIC_SERVICE,
  LANGUAGE_AND_KEY_WEBVIEW,
} from '../../../core/config';
import { laLigaCrests } from '../../shared/LaLigaCrestsNormalized';
import {
  currentGameweek,
  GameweekResponse,
} from '../types/currentGameweek.types';
import { Match, Matches } from '../types/laliga.types';

@Injectable()
export class LaLigaService {
  //private supabase: SupabaseClient;

  /*constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Las variables SUPABASE_URL o SUPABASE_KEY no están definidas.',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }*/

  public async fetchLaLigaCurrentGameweek(): Promise<GameweekResponse> {
    try {
      const url = `${LA_LIGA_URL_PUBLIC_SERVICE}/laliga-easports-2024/current-gameweek?${LANGUAGE_AND_KEY_PUBLIC_SERVICE}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = (await response.json()) as currentGameweek;

      const gameweek = data.gameweek;

      return {
        data: {
          gameweekName: gameweek.name, // ej. Jornada 29
          gameweek: gameweek.week, // ej. 29
        },
      };
    } catch (error) {
      console.error('Error fetching current gameweek:', error);
      throw new Error('Failed to fetch current gameweek');
    }
  }

  public async fetchLaLigaEvents() {
    const {
      data: { gameweek },
    } = await this.fetchLaLigaCurrentGameweek();

    const url = `${LA_LIGA_URL_WEBVIEW}/laliga-easports-2024/week/${gameweek}/matches?${LANGUAGE_AND_KEY_WEBVIEW}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = (await response.json()) as Matches;

      return { matches: data.matches, gameweek };
    } catch (error) {
      console.error('Error fetching La Liga events:', error);
      throw new Error('Failed to fetch La Liga events');
    }
  }

  addPointsFlag(matches: Match[]) {
    return matches.map((match) => ({
      ...match,
      points_calculated: match.points_calculated || false,
    }));
  }

  normalizeTeamCrests = (matches: Match[] | Match): Match[] | Match => {
    // puede llegar un array de partidos o un solo partido

    // si llega array se devuele un array de partidos con los escudos actualizados
    if (Array.isArray(matches)) {
      return matches.map((match) => {
        return {
          ...match,
          home_team: {
            ...match.home_team,
            shield: {
              ...match.home_team.shield,
              url: laLigaCrests[match.home_team.nickname],
            },
          },
          away_team: {
            ...match.away_team,
            shield: {
              ...match.away_team.shield,
              url: laLigaCrests[match.away_team.nickname],
            },
          },
        };
      });
    }

    // si llega un solo partido se devuelve un solo partido con los escudos actualizados
    return {
      ...matches,
      home_team: {
        ...matches.home_team,
        shield: {
          ...matches.home_team.shield,
          url: laLigaCrests[matches.home_team.nickname],
        },
      },
      away_team: {
        ...matches.away_team,
        shield: {
          ...matches.away_team.shield,
          url: laLigaCrests[matches.away_team.nickname],
        },
      },
    };
  };

  getEvents = async () => {
    // const { data, error } = await this.supabase.from('events').select('*');
    // console.log('Data from Supabase:', data);

    // // si no hay datos se recogen los eventos de la API y se guardan en la base de datos

    // if (error) {
    //   console.error('Error fetching events from Supabase:', error);
    //   throw new Error('Failed to fetch events from Supabase');
    // }

    // if (data.length === 0) {
    const { matches, gameweek } = await this.fetchLaLigaEvents();
    const normalizedEvents = this.normalizeTeamCrests(matches);
    const eventsWithPointsFlag = this.addPointsFlag(
      normalizedEvents as Match[],
    );

    const eventsOK = eventsWithPointsFlag.map((event) => ({
      ...event,
      competition_id: 1,
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
  getEventsCron = async () => {
    const { matches, gameweek } = await this.fetchLaLigaEvents();
    const normalizedEvents = this.normalizeTeamCrests(matches);
    const eventsWithPointsFlag = this.addPointsFlag(
      normalizedEvents as Match[],
    );

    const eventsOK = eventsWithPointsFlag.map((event) => ({
      ...event,
      competition_id: 1,
      sport_id: 1,
      gameweek,
    }));

    return eventsOK;
  };
}
