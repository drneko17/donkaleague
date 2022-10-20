import { LiveMatchParticipantType } from "../../types/summonerTypes";
import Image from "next/image";
import { useEffect, useCallback, useState, useContext } from "react";
import useGetChampionIconUrl from "../../hooks/useGetChampionIconUrl";
import Link from "next/link";
import VersionContext from "../../context/version-context";

const LivePlayer: React.FC<{
  name: string;
  champId: number;
  image: string;
}> = ({ name, champId, image }) => {
  const [championIcon, setChampionIcon] = useState("");
  const version = useContext(VersionContext);

  const championIconUrlHandler = useCallback(async () => {
    const championIconUrl: any = await useGetChampionIconUrl(champId, version);
    setChampionIcon(championIconUrl);
  }, []);

  useEffect(() => {
    championIconUrlHandler();
  }, []);

  let imagePosition = image === "left" ? "flex-row-reverse" : "flex-row";

  return (
    <div
      className={`flex flex-reverse ${imagePosition} items-center justify-end my-1`}
    >
      <Link href={`/summoner/EUW1/${name}`}>
        <div className="hover:underline hover:cursor-pointer mx-2">{name}</div>
      </Link>
      <Image
        src={championIcon}
        width={32}
        height={32}
        layout="fixed"
        className="rounded-full"
      />
    </div>
  );
};

const FeaturedLiveGameTile: React.FC<{
  participants: LiveMatchParticipantType[];
  gameMode: string;
}> = ({ participants, gameMode }) => {
  return (
    <div className="flex flex-col text-my-white bg-my-gray items-center drop-shadow-lg rounded-xl py-2">
      <Link href={`/summoner/EUW1/${participants[0].summonerName}/live`}>
        <h1 className="text-2xl hover:underline hover:cursor-pointer">
          {gameMode}
        </h1>
      </Link>
      <section className="flex w-full px-4">
        <div className="w-6/12">
          {participants.slice(0, 5).map((player) => (
            <LivePlayer
              key={player.summonerId}
              name={player.summonerName}
              champId={player.championId}
              image="left"
            />
          ))}
        </div>
        <div className="w-6/12">
          {participants.slice(5, 10).map((player) => (
            <LivePlayer
              key={player.summonerId}
              name={player.summonerName}
              champId={player.championId}
              image="right"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedLiveGameTile;
