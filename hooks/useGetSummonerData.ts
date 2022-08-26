import { SUMMONER_BY_NAME, LEAGUE_BY_SUMMONER_ID } from "../public/constants";
import {
  SummonerByNameType,
  FullSummonerDataType,
  SummonerByIdType,
} from "../types/summonerTypes";

import formatUnicorn from "format-unicorn/safe";

type getSummonerDataType = (
  server: string | string[] | undefined,
  summoner: string | string[] | undefined,
  region: string | string[] | undefined
) => Promise<FullSummonerDataType>;

const useGetSummonerData: getSummonerDataType = async (
  server,
  summoner,
  region
) => {
  let allData = {};
  // GET SUMMONER DATA BY NAME
  const summonerResponse = await fetch(
    formatUnicorn(SUMMONER_BY_NAME, { server, summoner }),
    {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://developer.riotgames.com",
        "X-Riot-Token": process.env.RIOT_API_KEY,
      },
    }
  );
  const summonerData: SummonerByNameType = await summonerResponse.json();
  allData = { ...summonerData };

  //GET ADVANCED SUMMONER DATA BY ID

  const leagueResponse = await fetch(
    formatUnicorn(LEAGUE_BY_SUMMONER_ID, {
      summonerId: summonerData.id,
      server,
    }),
    {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://developer.riotgames.com",
        "X-Riot-Token": process.env.RIOT_API_KEY,
      },
    }
  );

  const leagueData: SummonerByIdType[] = await leagueResponse.json();
  allData = {
    ...allData,
    tier: leagueData[0].tier,
    rank: leagueData[0].rank,
    lp: leagueData[0].leaguePoints,
    wins: leagueData[0].wins,
    losses: leagueData[0].losses,
  };

  console.log(allData);
  return allData;
};

export default useGetSummonerData;
