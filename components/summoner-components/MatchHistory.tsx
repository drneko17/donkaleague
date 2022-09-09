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
      <div className={`flex flex-col ${classes}`}>
        {matches.map((match) => (
          <MatchTile
            match={match}
            userId={userId}
            key={match.metadata.matchId}
            server={server}
          />
        ))}
      </div>
    </>
  );
};

export default MatchHistory;
