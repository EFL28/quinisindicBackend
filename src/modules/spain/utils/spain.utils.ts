import { laLigaCrests } from 'src/modules/shared/LaLigaCrestsNormalized';
import { Match } from '../types/laliga.types';

export const normalizeTeamCrests = (
  matches: Match[] | Match,
): Match[] | Match => {
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

export const addPointsFlag = (matches: Match[]): Match[] => {
  return matches.map((match) => ({
    ...match,
    points_calculated: match.points_calculated || false,
  }));
};
