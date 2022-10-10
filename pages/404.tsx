import { NextPage } from "next";
import Image from "next/image";

const Custom404: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mt-8 text-my-white">404: Page not found!</h1>
      <div className="drop-shadow-xl rotate-180">
        <Image src="/monkabus.png" height={200} width={275} />
      </div>
    </div>
  );
};

export default Custom404;
