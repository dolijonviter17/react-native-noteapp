import axios from "axios";
import { Dispatch } from "react";
import {
  Action,
  ClubProps,
  LeaguesProps,
  StandingProps,
  TeamProps,
} from "../actions";
import { ActionType } from "../action-types";

export const fetchLiga = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_LIVESCORE,
    });
    try {
      const { data } = await axios.get(
        "https://api-football-standings.azharimm.dev/leagues"
      );

      const liga = data.data;
      dispatch({
        type: ActionType.FETCH_LIVESCORE_SUCCESS,
        leagues: liga,
      });
      // console.log(liga);
    } catch (error) {
      dispatch({
        type: ActionType.FETCH_LIVESCORE_ERROR,
        payload: error,
      });
    }
  };
};

export const selectedLeagues = (selectLiga: LeaguesProps) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_LEAGUE_TEAMS,
    });
    try {
      const { data } = await axios.get(
        `https://api-football-standings.azharimm.dev/leagues/${selectLiga.id}/standings?season`
      );
      const language = data.data.standings.map((teams: StandingProps) => ({
        ...teams.team,
        logo: teams.team.logos[0].href,
        stats: teams.stats,
      }));
      dispatch({
        type: ActionType.FETCH_CLUBS_SUCCESS,
        clubs: language,
        league: selectLiga,
      });
    } catch (error) {
      dispatch({
        type: ActionType.FETCH_LIVESCORE_ERROR,
        payload: error,
      });
    }
  };
};

export const fetchDetailLiga = (selectLiga: LeaguesProps) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_LIVESCORE,
    });
    try {
      const { data } = await axios.get(
        `https://api-football-standings.azharimm.dev/leagues/${selectLiga.id}/standings?season`
      );
      const language = data.data.standings.map((teams: StandingProps) => ({
        ...teams.team,
        logo: teams.team.logos[0].href,
        stats: teams.stats,
      }));

      dispatch({
        type: ActionType.FETCH_CLUBS_SUCCESS,
        clubs: language,
        league: selectLiga,
      });
    } catch (error) {
      dispatch({
        type: ActionType.FETCH_LIVESCORE_ERROR,
        payload: error,
      });
    }
  };
};

export const fetchStatsClub = (selectClub: TeamProps) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_CLUB_STATS,
      club: selectClub,
    });
  };
};
