// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import formatUnicorn from "format-unicorn/safe";

import { LEAGUE_BY_SUMMONER_ID } from "../../public/constants";
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
  const leagueResponse = await fetch(
    formatUnicorn(LEAGUE_BY_SUMMONER_ID, {
      summonerId: req.headers.summonerid,
      server: req.headers.server,
    }),
    {
      method: "GET",
      headers: headersConfig,
    }
  );

  const leagueData: SummonerByIdType = await leagueResponse.json();

  res.status(200).json({ leagueData });
}
