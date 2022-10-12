import SearchForm from "../summoner-components/SearchForm";

const SummonerNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl mt-12 text-my-white">
        SUMMONER NOT FOUND!
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
