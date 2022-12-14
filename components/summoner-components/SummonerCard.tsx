import Image from "next/image";
import formatUnicorn from "format-unicorn/safe";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

import useGetEmblem from "../../hooks/useGetEmblem";
import { PROFILE_IMAGE } from "../../public/constants";
import VersionContext from "../../context/version-context";

const SummonerCard: React.FC<{
  data: {
    id: string; // IS USED TO FETCH LIVE GAME
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
  classes: string;
  isLive: boolean;
}> = ({ data, classes, isLive }) => {
  const version = useContext(VersionContext);
  const router = useRouter();
  const { summoner, server } = router.query;
  const emblemUrl = useGetEmblem(data.tier);
  const pfpUrl = formatUnicorn(PROFILE_IMAGE, {
    iconId: data.profileIconId,
    gameVersion: version,
  });
  const winRatio = (data.wins / (data.losses + data.wins)) * 100;
  // console.log(data.id);

  const liveGameClasses = isLive
    ? "bg-[rgb(12,79,117)]"
    : "bg-[#374a67] cursor-not-allowed text-slate-400";
  return (
    <div
      className={`items-center justify-around drop-shadow-lg rounded-xl text-center text-my-white bg-my-gray ${classes}`}
    >
      <div>
        <h1 className="font-bold text-my-white text-2xl">{data.name}</h1>
        <div className="h-24 md:h-32 flex justify-center text-my-white bg items-end md:my-4">
          <div className="absolute z-10 w-[128px] text-center drop-shadow-lg">
            Level: {data.summonerLevel}
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32">
            <Image
              src={pfpUrl}
              width={128}
              height={128}
              layout="responsive"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
      {data.tier === "unranked" ? (
        <div className="text-xl">Unranked</div>
      ) : (
        <div className="text-xs md:text-base flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <Image
              src={emblemUrl}
              width={128}
              height={128}
              layout="responsive"
            />
          </div>
          <h3 className="mt-2">
            {data.tier} {data.rank} - {data.lp} LP
          </h3>
          <div>
            {data.wins}W/{data.losses}L
          </div>
          <div className="">{winRatio.toFixed(2)}% win ratio</div>
        </div>
      )}

      <div>
        <Link href={`/summoner/${server}/${summoner}/live`}>
          <button
            disabled={!isLive}
            className={`rounded-xl p-3 mt-2 ${liveGameClasses} drop-shadow-lg`}
          >
            Live Game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SummonerCard;
