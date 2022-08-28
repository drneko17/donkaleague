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
      <MatchTile match={matches[0]} userId={userId} />
    </>
  );
};

export default MatchHistory;
