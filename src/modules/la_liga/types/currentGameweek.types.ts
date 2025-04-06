export interface currentGameweek {
  gameweek: Gameweek;
}

interface Gameweek {
  id: number;
  week: number;
  name: string;
  shortname: string;
  date: string;
}

export interface GameweekResponse {
  data: {
    gameweekName: string;
    gameweek: number;
  };
}
