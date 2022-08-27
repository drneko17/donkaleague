export type SummonerByNameType = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type SummonerByIdType = {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBllot: boolean;
  hotStreak: boolean;
};

export type FullSummonerDataType = {
  summoner: {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
    tier: string;
    rank: string;
    lp: number;
    wins: number;
    losses: number;
  };
  matches: {
    metadata: {
      dataVersion: string;
      matchId: string;
      participants: string[];
    };
    info: {
      gameCreation: number;
      gameDuration: number;
      gameEndTimestamp: number;
      gameId: number;
      gameMode: string;
      gameName: string;
      gameStartTimestamp: number;
      gameType: string;
      gameVersion: string;
      mapId: number;
      participants: string[];
      platformId: string;
      queueId: number;
      teams: any[];
      tournamentCode: string;
    };
  }[];
};
