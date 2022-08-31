import { GetServerSideProps, NextPage } from "next";

import formatUnicorn from "format-unicorn/safe";

import {
  SummonerByNameType,
  LiveMatchType,
} from "../../../../types/summonerTypes";
import { SUMMONER_BY_NAME, LIVE_GAME } from "../../../../public/constants";

const headersConfig = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": `${process.env.RIOT_API_KEY}`,
};

const LiveGame: NextPage<{ summoner: string; liveGameData: any }> = ({
  summoner,
  liveGameData,
}) => {
  return (
    <>
      <div>Live game of {summoner}</div>
    </>
  );
};

export default LiveGame;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { server, summoner } = context.params!;

  // GET SUMMONER DATA
  const summonerResponse = await fetch(
    formatUnicorn(SUMMONER_BY_NAME, { server, summoner }),
    {
      method: "GET",
      headers: headersConfig,
    }
  );
  const summonerData: SummonerByNameType = await summonerResponse.json();

  // GET LIVE GAME DATA

  const liveMatchResponse = await fetch(
    formatUnicorn(LIVE_GAME, { server, summonerId: summonerData.id }),
    {
      method: "GET",
      headers: headersConfig,
    }
  );

  const liveMatchData: LiveMatchType = await liveMatchResponse.json();
  console.log(liveMatchData);

  return {
    props: {
      summoner,
      liveMatchData,
    },
  };
};
