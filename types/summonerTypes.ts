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

export type MatchDataType = {
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
    participants: {
      championName: string;
      summonerName: string;
      puuid: string;
      win: boolean;
      item0: number;
      item1: number;
      item2: number;
      item3: number;
      item4: number;
      item5: number;
      item6: number;
      assists: number;
      deaths: number;
      kills: number;
      summoner1Id: number;
      summoner2Id: number;
      perks: {
        statPerks: {
          defense: number;
          flex: number;
          offense: number;
        };
        styles: {
          description: string;
          selections: {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
          }[];
          style: number;
        }[];
      };
    }[];
    platformId: string;
    queueId: number;
    teams: any[];
    tournamentCode: string;
  };
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
  matches: MatchDataType[];
};

export type LiveMatchParticipantType = {
  teamId: number;
  spell1Id: number;
  spell2Id: number;
  championId: number;
  profileIconId: number;
  summonerName: string;
  bot: boolean;
  summonerId: string;
  gameCustomizationObjects: any[];
  perks: {
    perkIds: string[];
    perkStyle: number;
    perkSubStyle: number;
  };
};

export type LiveMatchType = {
  gameId: number;
  mapId: number;
  gameMode: string;
  gameType: string;
  gameQueueConfigId: number;
  participants: LiveMatchParticipantType[];
  observers: {
    encryptionKey: string;
  };
  platformId: string;
  bannedChampions: {
    championId: number;
    teamId: number;
    pickTurn: number;
  }[];
  gameStartTime: number;
  gameLength: number;
};

export type RuneType = {
  icon: string;
  id: number;
  key: string;
  longDesc: string;
  name: string;
  shortDesc: string;
};

export type RuneDataType = {
  icon: string;
  id: number;
  key: string;
  name: string;
  slots: {
    runes: RuneType[];
  }[];
};
