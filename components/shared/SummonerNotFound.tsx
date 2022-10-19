import SearchForm from "../summoner-components/SearchForm";
import { useRouter } from "next/router";

const SummonerNotFound: React.FC = () => {
  const router = useRouter();
  const name = router.query.summoner;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl mt-12 text-my-white">
        Summoner {name} was not found!
      </h1>
      <div className="text-center text-xl text-my-white mb-12">
        Please make sure you've spelled the name correctly and selected the
        correct server!
      </div>
      <SearchForm />
    </div>
  );
};
export default SummonerNotFound;
