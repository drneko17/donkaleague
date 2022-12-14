import { NextPage, GetServerSideProps } from "next";
import { useContext } from "react";
import formatUnicorn from "format-unicorn/safe";

import MatchHistory from "../../../../components/summoner-components/MatchHistory";
import SummonerCard from "../../../../components/summoner-components/SummonerCard";
import SummonerNotFound from "../../../../components/shared/SummonerNotFound";
import VersionContext from "../../../../context/version-context";

import useGetRegion from "../../../../hooks/useGetRegion";
import useGetSummonerData from "../../../../hooks/useGetSummonerData";

import { LIVE_GAME } from "../../../../public/constants";
import { FullSummonerDataType } from "../../../../types/summonerTypes";

const headersConfig = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": `${process.env.RIOT_API_KEY}`,
};

const SummonerProfile: NextPage<{
  data?: FullSummonerDataType;
  server?: string;
  isLive?: boolean;
  status: number;
}> = ({ data, server, isLive, status }) => {
  const version = useContext(VersionContext);
  console.log(version);

  let sch;

  if (status !== 404) {
    if (data!.summoner.tier === "unranked") {
      sch = "xl:h-[315px] h-44";
    } else {
      sch = "xl:h-[500px] h-44";
    }
  }

  return (
    <>
      {status === 404 ? (
        <SummonerNotFound />
      ) : (
        <div className="px-8 py-4 flex xl:flex-row flex-col w-full">
          <SummonerCard
            data={data!.summoner}
            classes={`w-[100%] xl:w-48 xl:min-w-[12rem] ${sch} mb-4 xl:mb-0 p-4 xl:py-4 xl:px-0 flex xl:block`}
            isLive={isLive!}
          />
          <MatchHistory
            server={server!}
            matches={data!.matches}
            userId={data!.summoner.puuid}
            classes="w-full xl:mx-4"
          />
        </div>
      )}
    </>
  );
};

export default SummonerProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { server, summoner } = context.params!;
  const region = useGetRegion(server);
  let isLive = false;

  const data = (await useGetSummonerData(
    server,
    summoner,
    region
  )) as FullSummonerDataType;
  if (!data.summoner) {
    return {
      props: {
        status: 404,
      },
    };
  }

  // console.log(data.summoner);

  const liveMatchResponse = await fetch(
    formatUnicorn(LIVE_GAME, { server, summonerId: data.summoner.id }),
    {
      method: "GET",
      headers: headersConfig,
    }
  );
  if (liveMatchResponse.status === 200) {
    isLive = true;
  }

  return {
    props: {
      data,
      server,
      isLive,
      status: 200,
    },
  };
};
