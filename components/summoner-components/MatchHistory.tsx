import { MatchDataType } from "../../types/summonerTypes";

import MatchTile from "./MatchTile";

const MatchHistory: React.FC<{
  matches: MatchDataType[];
  userId: string;
  classes: string;
}> = ({ matches, userId, classes }) => {
  // console.log(matches);
  // console.log(matches[0]);

  return (
    <>
      <div className={`flex flex-col w-[72rem] mx-4 ${classes}`}>
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
