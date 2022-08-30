import { MatchDataType } from "../../types/summonerTypes";

import MatchTile from "./MatchTile";

const MatchHistory: React.FC<{
  matches: MatchDataType[];
  userId: string;
  classes: string;
  server: string;
}> = ({ matches, userId, classes, server }) => {
  return (
    <>
      <div className={`flex flex-col w-[72rem] mx-4 ${classes}`}>
        {matches.map((match) => (
          <MatchTile
            match={match}
            userId={userId}
            key={match.metadata.matchId}
            server={server}
          />
        ))}
        {/* <MatchTile match={matches[0]} userId={userId} /> */}
      </div>
    </>
  );
};

export default MatchHistory;
