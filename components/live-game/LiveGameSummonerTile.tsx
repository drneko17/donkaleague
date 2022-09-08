import { useEffect, useCallback, useState } from "react";

import useGetChampionIconUrl from "../../hooks/useGetChampionIconUrl";
import useGetSummonerSpellUrl from "../../hooks/useGetSummonerSpellUrl";
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

const LiveGameSummonerTile: React.FC<{
  data: LiveMatchParticipantType;
  classes: string;
}> = ({ data, classes }) => {
  const router = useRouter();
  const { summonerId } = data;

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
    tier: "",
    rank: "",
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

  const summonerSpell1Url = useGetSummonerSpellUrl(data.spell1Id);
  const summonerSpell2Url = useGetSummonerSpellUrl(data.spell2Id);

  const championIconUrlHandler = useCallback(async () => {
    const championIconUrl: any = await useGetChampionIconUrl(data.championId);
    setChampionIcon(championIconUrl);
  }, []);

  const runesHandler = useCallback(async () => {
    const foundRunes = await useGetRunesByIdArray(data.perks.perkIds);
    setRunes(foundRunes);
  }, []);

  const summonerDataHandler = useCallback(async () => {
    const response = await fetch("/api/hello", {
      method: "GET",
      headers: {
        summonerid: `${summonerId}`,
        server: `${router.query.server}`,
      },
    });

    const responseData = await response.json();
    const thisSummoner = responseData.leagueData.find(
      (item: SummonerByIdType) => item.summonerId === summonerId
    );
    setEmblemUrl(useGetEmblem(thisSummoner.tier));
    setThisSummonerData(thisSummoner);
  }, []);

  useEffect(() => {
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
            src={championIcon}
            width={64}
            height={64}
            layout="fixed"
            className="rounded-full drop-shadow-lg"
          />
          <div className="flex flex-col">
            <Image
              src={summonerSpell1Url}
              width={32}
              height={32}
              className="rounded-xl drop-shadow-lg"
              layout="fixed"
            />
            <Image
              src={summonerSpell2Url}
              width={32}
              height={32}
              className="rounded-xl drop-shadow-lg"
              layout="fixed"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-4">
          <Image src={emblemUrl} width={128} height={128} />
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
        {/* RUNES */}
        <div className="flex items-center space-x-2 py-4">
          <div className="flex flex-col items-center space-y-1">
            {runes.slice(0, 1).map((rune) => (
              <div className="drop-shadow-lg">
                <Image
                  src={`https://ddragon.canisback.com/img/${rune.icon}`}
                  width={48}
                  height={48}
                  className="rounded-xl"
                  layout="fixed"
                />
              </div>
            ))}
            {runes.slice(1, 4).map((rune) => (
              <div className="drop-shadow-lg">
                <Image
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
              <div className="drop-shadow-lg">
                <Image
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
