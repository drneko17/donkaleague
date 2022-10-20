import { useEffect, useCallback, useState, useContext } from "react";

import useGetChampionIconUrl from "../../hooks/useGetChampionIconUrl";
import useGetSummonerSPellUrlInABetterWay from "../../hooks/useGetSummonerSpellUrlInABetterWay";
import Image from "next/image";
import Link from "next/link";

import {
  LiveMatchParticipantType,
  SummonerByIdType,
  RuneType,
} from "../../types/summonerTypes";
import useGetRunesByIdArray from "../../hooks/useGetRunesByIdArray";
import useGetEmblem from "../../hooks/useGetEmblem";
import { useRouter } from "next/router";
import VersionContext from "../../context/version-context";

const LiveGameSummonerTile: React.FC<{
  data: LiveMatchParticipantType;
  classes: string;
}> = ({ data, classes }) => {
  const version = useContext(VersionContext);
  const router = useRouter();
  const { summonerId } = data;

  const [summonerSpell1Url, setSummonerSpell1Url] = useState("");
  const [summonerSpell2Url, setSummonerSpell2Url] = useState("");
  const [championIcon, setChampionIcon] = useState("");
  const [emblemUrl, setEmblemUrl] = useState("");
  const [runes, setRunes] = useState([
    {
      icon: "",
      id: 0,
      key: "",
      longDesc: "",
      name: "",
      shortDesc: "",
    },
  ]);
  const [thisSummonerData, setThisSummonerData] = useState({
    leagueId: "",
    queueType: "",
    tier: "unranked",
    rank: "unranked",
    summonerId: "",
    summonerName: "",
    leaguePoints: 0,
    wins: 0,
    losses: 0,
    veteran: false,
    inactive: false,
    freshBllot: false,
    hotStreak: false,
  });

  const summonerSpellsUrlHandler = useCallback(async () => {
    const result1 = await useGetSummonerSPellUrlInABetterWay(
      data.spell1Id,
      version
    );
    setSummonerSpell1Url(result1);
    const result2 = await useGetSummonerSPellUrlInABetterWay(
      data.spell2Id,
      version
    );
    setSummonerSpell2Url(result2);
  }, []);

  const championIconUrlHandler = useCallback(async () => {
    const championIconUrl: any = await useGetChampionIconUrl(
      data.championId,
      version
    );
    setChampionIcon(championIconUrl);
  }, []);

  // console.log(data);

  const runesHandler = useCallback(async () => {
    const foundRunes = await useGetRunesByIdArray(data.perks.perkIds, version);
    setRunes(foundRunes);
  }, []);

  const summonerDataHandler = useCallback(async () => {
    const response = await fetch("/api/fetchSummonerRank", {
      method: "GET",
      headers: {
        summonerid: `${summonerId}`,
        server: `${router.query.server}`,
      },
    });

    const responseData = await response.json();
    let soloNumber: number;
    if (
      responseData.leagueData.length === 2 ||
      (responseData.leagueData.length === 1 &&
        responseData.leagueData[0].queueType === "RANKED_SOLO_5x5")
    ) {
      soloNumber =
        responseData.leagueData[0].queueType === "RANKED_SOLO_5x5" ? 0 : 1;
      setEmblemUrl(useGetEmblem(responseData.leagueData[soloNumber!].tier));
      setThisSummonerData(responseData.leagueData[soloNumber!]);
    }
  }, []);

  useEffect(() => {
    summonerSpellsUrlHandler();
    championIconUrlHandler();
    runesHandler();
    summonerDataHandler();
  }, []);

  return (
    <>
      <div
        className={`${classes} rounded-xl flex flex-col w-48 drop-shadow-lg items-center`}
      >
        <Link href={`/summoner/${router.query.server}/${data.summonerName}`}>
          <div className="hover:underline hover:cursor-pointer text-lg">
            {data.summonerName}
          </div>
        </Link>
        <div className="flex items-center space-x-1">
          <Image
            placeholder="empty"
            src={championIcon}
            width={64}
            height={64}
            layout="fixed"
            className="rounded-full drop-shadow-lg"
          />
          <div className="flex flex-col">
            <Image
              placeholder="empty"
              src={summonerSpell1Url}
              width={32}
              height={32}
              className="rounded-xl drop-shadow-lg"
              layout="fixed"
            />
            <Image
              placeholder="empty"
              src={summonerSpell2Url}
              width={32}
              height={32}
              className="rounded-xl drop-shadow-lg"
              layout="fixed"
            />
          </div>
        </div>
        {thisSummonerData.tier === "unranked" ? (
          <div className="flex flex-col justify-center h-[216px]">
            <div className="">unranked</div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-4">
            <Image
              placeholder="empty"
              src={emblemUrl}
              width={128}
              height={128}
            />
            <div className="">
              {thisSummonerData.tier} {thisSummonerData.rank} -{" "}
              {thisSummonerData.leaguePoints} LP
            </div>
            <div>
              {thisSummonerData.wins}W/{thisSummonerData.losses}L
            </div>
            <div>
              {(
                (thisSummonerData.wins /
                  (thisSummonerData.wins + thisSummonerData.losses)) *
                100
              ).toFixed(2)}
              % win ratio
            </div>
          </div>
        )}

        {/* RUNES */}
        <div className="flex items-center space-x-2 py-4">
          <div className="flex flex-col items-center space-y-1">
            {runes.slice(0, 1).map((rune) => (
              <div key={rune.id + data.summonerId} className="drop-shadow-lg">
                <Image
                  placeholder="empty"
                  src={`https://ddragon.canisback.com/img/${rune.icon}`}
                  width={48}
                  height={48}
                  className="rounded-xl"
                  layout="fixed"
                />
              </div>
            ))}
            {runes.slice(1, 4).map((rune) => (
              <div key={rune.id + data.summonerId} className="drop-shadow-lg">
                <Image
                  placeholder="empty"
                  src={`https://ddragon.canisback.com/img/${rune.icon}`}
                  width={32}
                  height={32}
                  className="rounded-xl"
                  layout="fixed"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center space-y-1">
            {runes.slice(4, 6).map((rune) => (
              <div key={rune.id + data.summonerId} className="drop-shadow-lg">
                <Image
                  placeholder="empty"
                  src={`https://ddragon.canisback.com/img/${rune.icon}`}
                  width={32}
                  height={32}
                  className="rounded-xl"
                  layout="fixed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveGameSummonerTile;
