import { MatchDataType } from "../../types/summonerTypes";
import useGetRegion from "../../hooks/useGetRegion";
import { useState } from "react";

import MatchTile from "./MatchTile";

const MatchHistory: React.FC<{
  matches: MatchDataType[];
  userId: string;
  classes: string;
  server: string;
}> = ({ matches, userId, classes, server }) => {
  const [visibleMatches, setVisibleMatches] = useState(matches);
  console.log(matches.length);

  const fetchMoreHandler = async () => {
    const response = await fetch("/api/fetchMoreMatches", {
      method: "GET",
      headers: {
        region: useGetRegion(server),
        puuid: userId,
        start: `${visibleMatches.length}`,
        count: "5",
      },
    });
    const data = await response.json();
    setVisibleMatches((prevMatches) => [...prevMatches, ...data]);
  };

  return (
    <>
      <div className={`flex flex-col ${classes}`}>
        {visibleMatches.map((match) => (
          <MatchTile
            match={match}
            userId={userId}
            key={match.metadata.matchId}
            server={server}
          />
        ))}
        <button
          onClick={fetchMoreHandler}
          className={`rounded-xl p-3 mt-2 bg-[rgb(12,79,117)] text-my-white w-32 text-lg self-center drop-shadow-lg`}
        >
          Load more...
        </button>
      </div>
    </>
  );
};

export default MatchHistory;
