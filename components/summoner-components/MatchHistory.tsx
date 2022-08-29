import { MatchDataType } from "../../types/summonerTypes";

import MatchTile from "./MatchTile";

const MatchHistory: React.FC<{
  matches: MatchDataType[];
  userId: string;
}> = ({ matches, userId }) => {
  // console.log(matches);
  // console.log(matches[0]);

  return (
    <>
      <div className="flex flex-col w-[72rem] bg-white mx-4">
        {matches.map((match) => (
          <MatchTile
            match={match}
            userId={userId}
            key={match.metadata.matchId}
          />
        ))}
        {/* <MatchTile match={matches[0]} userId={userId} /> */}
      </div>
    </>
  );
};

export default MatchHistory;
