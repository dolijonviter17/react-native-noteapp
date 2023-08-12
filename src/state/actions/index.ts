import { ActionType } from "../action-types";

export interface LeaguesProps {
  id: string;
  name: string;
  slug: string;
  abbr: string;
  abbreviation: string;
  season: string;
  seasonDisplay: string;
  logos: {
    light: string;
    dark: string;
  };
}

// team: {
//   id: string;
//   uid: string;
//   location: string;
//   name: string;
//   abbreviation: string;
//   displayName: string;
//   shortDisplayName: string;
// };
// stats: string[];

export interface StatsProps {
  abbreviation: string;
  description: string;
  displayName: string;
  displayValue: string;
  name: string;
  shortDisplayName: string;
  type: string;
  value: string;
  summary?: string;
}
export interface TeamProps {
  id: string;
  uid: string;
  location: string;
  abbr: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  logo: string;
  logos: {
    [key: string]: string;
  }[];
}
interface Logos {
  href: string;
}

export interface StandingProps {
  team: TeamProps;
  stats: StatsProps[];
}

export interface ClubProps {
  name: string;
  abbreviation: string;
  season: string;
  seasonDisplay: string;
  standings: {
    team: TeamProps;
    logos: Logos[];
  }[];
}
export interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORIES;
}

export interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}

export interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}
// Loading
export interface FetchLiveScore {
  type: ActionType.FETCH_LIVESCORE;
}
export interface FetchLeagueTeams {
  type: ActionType.FETCH_LEAGUE_TEAMS;
}

// Loading

export interface FetchLiveScoreSuccess {
  type: ActionType.FETCH_LIVESCORE_SUCCESS;
  leagues: LeaguesProps[];
}
export interface FetchLiveScoreError {
  type: ActionType.FETCH_LIVESCORE_ERROR;
  payload: any;
}

export interface FetchClubs {
  type: ActionType.FETCH_CLUBS_SUCCESS;
  clubs: TeamProps[];
  league: LeaguesProps;
}
export interface FetchClubStats {
  type: ActionType.FETCH_CLUB_STATS;
  club: TeamProps;
}

export type Action =
  | FetchLiveScore
  | FetchLeagueTeams
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction
  | FetchLiveScoreSuccess
  | FetchLiveScoreError
  | FetchClubs
  | FetchClubStats;
