import {
  SUMMONER_BY_NAME,
  LEAGUE_BY_SUMMONER_ID,
  MATCHES_BY_SUMMONER_ID,
  MATCH_BY_MATCH_ID,
} from "../public/constants";
import {
  SummonerByNameType,
  FullSummonerDataType,
  SummonerByIdType,
} from "../types/summonerTypes";

import formatUnicorn from "format-unicorn/safe";

const headersConfig = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": `${process.env.RIOT_API_KEY}`,
};

type GetSummonerDataType = (
  server: string | string[] | undefined,
  summoner: string | string[] | undefined,
  region: string | string[] | undefined
) => Promise<FullSummonerDataType | string>;

const useGetSummonerData: GetSummonerDataType = async (
  server,
  summoner,
  region
) => {
  // GET SUMMONER DATA BY NAME
  const summonerResponse = await fetch(
    formatUnicorn(SUMMONER_BY_NAME, { server, summoner }),
    {
      method: "GET",
      headers: headersConfig,
    }
  );
  const summonerData: SummonerByNameType = await summonerResponse.json();
  if (!summonerData.id) {
    return "summoner not found";
  }

  //GET ADVANCED SUMMONER DATA BY ID

  const leagueResponse = await fetch(
    formatUnicorn(LEAGUE_BY_SUMMONER_ID, {
      summonerId: summonerData.id,
      server,
    }),
    {
      method: "GET",
      headers: headersConfig,
    }
  );

  const leagueData: SummonerByIdType[] = await leagueResponse.json();
  let soloPosition = leagueData[0].queueType === "RANKED_SOLO_5x5" ? 0 : 1;
  // console.log(leagueData);
  // console.log(`soloposition is ${soloPosition}`);

  //GET MATCHES IDs
  const response = await fetch("http://localhost:4200/api/fetchMoreMatches", {
    method: "GET",
    headers: {
      region: `${region}`,
      puuid: `${summonerData.puuid}`,
      start: "0",
      count: "5",
    },
  });
  const matchData = await response.json();

  // const matchesResponse = await fetch(
  //   formatUnicorn(MATCHES_BY_SUMMONER_ID, {
  //     realm: region,
  //     summonerId: summonerData.puuid,
  //     start: 0,
  //     count: 20,
  //   }),
  //   {
  //     method: "GET",
  //     headers: headersConfig,
  //   }
  // );

  // const matchesData: string[] = await matchesResponse.json();
  // const twoMatches: string[] = matchesData.slice(0, 2);
  // //GET MATCH DETAILS BY MATCH ID
  // let matchDetailsArr: any[] = [];

  // const fetchMatchDetails = async (realm: any, matchId: string) => {
  //   const matchesDetailsResponse = await fetch(
  //     formatUnicorn(MATCH_BY_MATCH_ID, {
  //       realm,
  //       matchId,
  //     }),
  //     { method: "GET", headers: headersConfig }
  //   );
  //   const matchesDetailsData = await matchesDetailsResponse.json();
  //   return matchesDetailsData;
  // };

  // for (const match of twoMatches) {
  //   const data = await fetchMatchDetails(region, match);
  //   matchDetailsArr.push(data);
  // }

  let allData: FullSummonerDataType = {
    summoner: {
      ...summonerData,
      tier: leagueData[soloPosition].tier,
      rank: leagueData[soloPosition].rank,
      lp: leagueData[soloPosition].leaguePoints,
      wins: leagueData[soloPosition].wins,
      losses: leagueData[soloPosition].losses,
    },
    matches: matchData,
  };
  // console.log(allData);
  return allData;
};

export default useGetSummonerData;
