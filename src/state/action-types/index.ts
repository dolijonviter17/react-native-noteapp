export enum ActionType {
  SEARCH_REPOSITORIES = "search_repositories",
  SEARCH_REPOSITORIES_SUCCESS = "search_repositories_success",
  SEARCH_REPOSITORIES_ERROR = "search_repositories_error",

  FETCH_LIVESCORE = "fetch_livescore",
  FETCH_LIVESCORE_SUCCESS = "fetch_livescore_success",
  FETCH_LIVESCORE_ERROR = "fetch_livescore_error",

  FETCH_CLUBS_SUCCESS = "fetch_clubs_success",
  FETCH_CLUB_STATS = "fetch_club_stats",

  FETCH_LEAGUE_TEAMS = "fetch_league_teams",
}

const profile = ({ age, name }: { age: number; name: string }): string => {
  return "hellow brother";
};
