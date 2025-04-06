export interface PremierLeagueResponse {
  pageInfo: PageInfo;
  content: Content[];
  _source: string;
}

export interface Content {
  gameweek: Gameweek;
  kickoff: Kickoff;
  provisionalKickoff: Kickoff;
  teams: Team2[];
  replay: boolean;
  ground: Ground;
  neutralGround: boolean;
  status: string;
  phase: string;
  outcome?: string;
  attendance?: number;
  clock?: Clock;
  fixtureType: string;
  extraTime: boolean;
  shootout: boolean;
  matchOfficials: MatchOfficial[];
  goals: (Goal | Goals2)[];
  penaltyShootouts: any[];
  behindClosedDoors: boolean;
  id: number;
  altIds: AltIds;
}

export interface Goals2 {
  personId: number;
  assistId: number;
  clock: Clock;
  phase: string;
  type: string;
  description: string;
}

export interface Goal {
  personId: number;
  assistId?: number;
  clock: Clock;
  phase: string;
  type: string;
  description: string;
}

export interface MatchOfficial {
  matchOfficialId: number;
  role?: string;
  birth: Birth;
  name: Name;
  id: number;
}

export interface Name {
  display: string;
  first: string;
  last: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Birth {}

export interface Clock {
  secs: number;
  label: string;
}

export interface Ground {
  name: string;
  city: string;
  source: string;
  id: number;
}

export interface Team2 {
  team: Team;
  score?: number;
}

export interface Team {
  name: string;
  club: Club;
  teamType: string;
  shortName: string;
  id: number;
  altIds: AltIds;
}

export interface Club {
  name: string;
  shortName: string;
  abbr: string;
  id: number;
}

export interface Kickoff {
  completeness: number;
  millis: number;
  label: string;
  gmtOffset: number;
}

export interface Gameweek {
  id: number;
  compSeason: CompSeason;
  gameweek: number;
  competitionPhase: CompetitionPhase;
}

export interface CompetitionPhase {
  id: number;
  type: string;
  gameweekRange: number[];
}

export interface CompSeason {
  label: string;
  competition: Competition;
  id: number;
}

export interface Competition {
  abbreviation: string;
  description: string;
  level: string;
  source: string;
  id: number;
  altIds: AltIds;
}

export interface AltIds {
  opta: string;
}

export interface PageInfo {
  page: number;
  numPages: number;
  pageSize: number;
  numEntries: number;
}
