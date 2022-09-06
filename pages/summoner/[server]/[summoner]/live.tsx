import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import useGetRegion from "../../../../hooks/useGetRegion";

import formatUnicorn from "format-unicorn/safe";

import LiveGameSummonerTile from "../../../../components/live-game/LiveGameSummonerTile";
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

const LiveGame: NextPage<{
  summoner: string;
  liveMatchData: LiveMatchType;
}> = ({ summoner, liveMatchData }) => {
  const router = useRouter();
  const region = useGetRegion(router.query.server);
  // console.log(liveMatchData);

  const team1 = liveMatchData.participants.slice(0, 5); //set back to slice(0, 5)
  const team2 = liveMatchData.participants.slice(5, 10);
  // console.log(team1);

  const teamClasses = "flex space-x-4 drop-shadow-2xl";
  return (
    <div className="p-4 flex flex-col items-center">
      <div>Live game of {summoner}</div>
      <div className={`${teamClasses}`}>
        {team1.map((participant) => (
          <LiveGameSummonerTile
            classes="bg-[rgba(12,79,117,0.75)] text-[#F7F4F3]"
            data={participant}
            key={participant.summonerId}
          />
        ))}
      </div>
      <div className={`${teamClasses} mt-4`}>
        {team2.map((participant) => (
          <LiveGameSummonerTile
            classes="bg-[rgba(117,12,66,0.75)] text-[#F7F4F3]"
            data={participant}
            key={participant.summonerId}
          />
        ))}
      </div>
    </div>
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
  // console.log(liveMatchData);

  return {
    props: {
      summoner,
      liveMatchData,
    },
  };
};
