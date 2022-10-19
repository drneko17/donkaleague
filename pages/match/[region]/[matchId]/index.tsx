import { NextPage } from "next";
import { useRouter } from "next/router";

import { MATCH_BY_MATCH_ID } from "../../../../public/constants";

const MatchDetail: NextPage = () => {
  const router = useRouter();
  console.log(router.query);

  return (
    <>
      <div>Match: {router.query.matchId}</div>
    </>
  );
};

export default MatchDetail;
