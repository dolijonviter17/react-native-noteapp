import { ActionType } from "../action-types";
import {
  Action,
  ClubProps,
  LeaguesProps,
  StatsProps,
  TeamProps,
} from "../actions";

export interface LiveScoreState {
  loading: boolean;
  loading_team: boolean;
  error: string | null;
  leagues: LeaguesProps[];
  league: any;
  clubs: TeamProps[];
  club: any;
  stats: StatsProps[];
}

const initialsState = {
  loading: false,
  error: null,
  leagues: [],
  league: {},
  clubs: [],
  club: {},
  stats: [],
  loading_team: false,
};

const reducer = (
  state: LiveScoreState = initialsState,
  action: Action
): LiveScoreState => {
  switch (action.type) {
    case ActionType.FETCH_LIVESCORE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FETCH_LEAGUE_TEAMS:
      return {
        ...state,
        loading_team: true,
        error: null,
      };
    case ActionType.FETCH_LIVESCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        loading_team: false,
        error: null,
        leagues: action.leagues,
      };
    case ActionType.FETCH_CLUBS_SUCCESS:
      return {
        ...state,
        loading: false,
        loading_team: false,

        error: null,
        clubs: action.clubs,
        league: action.league,
      };
    case ActionType.FETCH_CLUB_STATS:
      return {
        ...state,
        club: action.club,
      };
    case ActionType.FETCH_LIVESCORE_ERROR:
      return {
        ...state,
        loading: false,
        loading_team: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
