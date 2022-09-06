import { useEffect, useCallback, useState } from "react";

import useGetChampionIconUrl from "../../hooks/useGetChampionIconUrl";
import useGetSummonerSpellUrl from "../../hooks/useGetSummonerSpellUrl";
import Image from "next/image";

import { LiveMatchParticipantType } from "../../types/summonerTypes";
import useGetRunesByIdArray from "../../hooks/useGetRunesByIdArray";

const LiveGameSummonerTile: React.FC<{
  data: LiveMatchParticipantType;
  classes: string;
}> = ({ data, classes }) => {
  const [championIcon, setChampionIcon] = useState("");
  const [runes, setRunes] = useState([]);

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

  useEffect(() => {
    championIconUrlHandler();
    runesHandler();
  }, []);

  return (
    <>
      <div
        className={`${classes} rounded-xl flex flex-col w-48 drop-shadow-lg items-center`}
      >
        <div>{data.summonerName}</div>
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
