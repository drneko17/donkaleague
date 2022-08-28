import { NextPage, GetServerSideProps } from "next";
import MatchHistory from "../../../components/summoner-components/MatchHistory";
import SummonerCard from "../../../components/summoner-components/SummonerCard";

import useGetRegion from "../../../hooks/useGetRegion";
import useGetSummonerData from "../../../hooks/useGetSummonerData";
import { FullSummonerDataType } from "../../../types/summonerTypes";

const SummonerProfile: NextPage<{ data: FullSummonerDataType }> = ({
  data,
}) => {
  return (
    <>
      <div className="px-8 py-4 flex">
        <SummonerCard data={data.summoner} />
        <MatchHistory matches={data.matches} userId={data.summoner.puuid} />
      </div>
    </>
  );
};

export default SummonerProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { server, summoner } = context.params!;
  const region = useGetRegion(server);

  const data = await useGetSummonerData(server, summoner, region);
  // console.log(data);

  return {
    props: {
      data,
    },
  };
};
