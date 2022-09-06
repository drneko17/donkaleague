import Image from "next/image";
import formatUnicorn from "format-unicorn/safe";
import Link from "next/link";
import { useRouter } from "next/router";

import useGetEmblem from "../../hooks/useGetEmblem";
import { PROFILE_IMAGE } from "../../public/constants";

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
  const router = useRouter();
  const { summoner, server } = router.query;
  const emblemUrl = useGetEmblem(data.tier);
  const pfpUrl = formatUnicorn(PROFILE_IMAGE, { iconId: data.profileIconId });
  const winRatio = (data.wins / (data.losses + data.wins)) * 100;
  console.log(data.id);

  const liveGameClasses = isLive
    ? "bg-[rgb(12,79,117)]"
    : "bg-[#374a67] cursor-not-allowed text-slate-400";
  return (
    <>
      <div
        className={`drop-shadow-lg rounded-xl bg-[#2F3D53] flex flex-col items-center w-48 h-[500px] py-4 ${classes}`}
      >
        <div className="text-center drop-shadow-lg text-[#F7F4F3]">
          <h1 className="font-bold text-[#F7F4F3] text-2xl">{data.name}</h1>
          <div className="h-32 flex justify-center text-[#F7F4F3] bg items-end my-4">
            <div className="absolute z-10 w-[128px] text-center drop-shadow-lg">
              Level: {data.summonerLevel}
            </div>
            <Image
              src={pfpUrl}
              width={128}
              height={128}
              className="rounded-3xl"
            />
          </div>
          <Image src={emblemUrl} width={128} height={128} />
          <h3 className="mt-2">
            {data.tier} {data.rank} - {data.lp} LP
          </h3>
          <div>
            {data.wins}W/{data.losses}L
          </div>
          <div className="">{winRatio.toFixed(2)}% win ratio</div>
          <Link href={`/summoner/${server}/${summoner}/live`}>
            <button
              disabled={!isLive}
              className={`rounded-xl p-3 mt-2 ${liveGameClasses}`}
            >
              Live Game
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SummonerCard;
