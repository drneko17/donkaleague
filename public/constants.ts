export const ITEMS_URL: string =
  "http://ddragon.leagueoflegends.com/cdn/12.13.1/data/en_US/item.json";

export const PROFILE_IMAGE: string =
  "http://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/{iconId}.png";

export const SUMMONER_BY_NAME: string =
  "https://{server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner}";

export const LEAGUE_BY_SUMMONER_ID: string =
  "https://{server}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summonerId}";

export const MATCHES_BY_SUMMONER_ID: string =
  "https://{realm}.api.riotgames.com/lol/match/v5/matches/by-puuid/{summonerId}/ids?start=0&count=20";

export const MATCH_BY_MATCH_ID: string =
  "https://{realm}.api.riotgames.com/lol/match/v5/matches/{matchId}";
