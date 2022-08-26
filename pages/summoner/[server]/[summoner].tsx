import { NextPage, GetServerSideProps } from "next";

import useGetRegion from "../../../hooks/useGetRegion";
import useGetSummonerData from "../../../hooks/useGetSummonerData";

const SummonerProfile: NextPage<{}> = ({}) => {
  return (
    <>
      <div className="flex">Summoner Profile</div>
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
      summonerData: {},
    },
  };
};
