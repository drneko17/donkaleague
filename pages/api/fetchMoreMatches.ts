// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import formatUnicorn from "format-unicorn/safe";

import {
  MATCHES_BY_SUMMONER_ID,
  MATCH_BY_MATCH_ID,
} from "../../public/constants";
import { SummonerByIdType } from "../../types/summonerTypes";

const headersConfig = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": `${process.env.RIOT_API_KEY}`,
};

type Data = {
  leagueData: SummonerByIdType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { region, puuid, start, count } = req.headers;

  //GET MATCHES IDs
  const matchesResponse = await fetch(
    formatUnicorn(MATCHES_BY_SUMMONER_ID, {
      realm: region,
      summonerId: puuid,
      start: start,
      count: count,
    }),
    {
      method: "GET",
      headers: headersConfig,
    }
  );
  const matchesData: string[] = await matchesResponse.json();

  console.log(matchesData);

  //GET MATCH DETAILS BY MATCH ID

  let matchDetailsArr: any[] = [];

  const fetchMatchDetails = async (realm: any, matchId: string) => {
    const matchesDetailsResponse = await fetch(
      formatUnicorn(MATCH_BY_MATCH_ID, {
        realm,
        matchId,
      }),
      { method: "GET", headers: headersConfig }
    );
    const matchesDetailsData = await matchesDetailsResponse.json();
    return matchesDetailsData;
  };

  for (const match of matchesData) {
    const data = await fetchMatchDetails(region, match);
    matchDetailsArr.push(data);
  }

  res.status(200).json(matchDetailsArr);
}
