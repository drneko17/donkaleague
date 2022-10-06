import { GetServerSideProps, NextPage } from "next";
import formatUnicorn from "format-unicorn/safe";

import { LiveMatchType } from "../types/summonerTypes";
import { FEATURED_LIVE_GAMES } from "../public/constants";
import useGetChampionIconUrl from "../hooks/useGetChampionIconUrl";

import FeaturedLiveGameTile from "../components/live-game/FeaturedLiveGameTile";

const headersConfig = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": `${process.env.RIOT_API_KEY}`,
};

const Live: NextPage<{ matches: LiveMatchType[]; testData: any }> = ({
  matches,
}) => {
  return (
    <div className="flex px-4 flex-wrap place-content-around">
      {matches.map((match) => (
        <div className="w-[420px] my-4" key={match.gameId}>
          <FeaturedLiveGameTile
            participants={match.participants}
            gameMode={match.gameMode}
          />
        </div>
      ))}
    </div>
  );
};

export default Live;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const server = "EUW1";

  const response = await fetch(formatUnicorn(FEATURED_LIVE_GAMES, { server }), {
    method: "GET",
    headers: headersConfig,
  });
  const data = await response.json();

  return {
    props: {
      matches: data.gameList,
    },
  };
};
