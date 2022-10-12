import Link from "next/link";
import { useState } from "react";

import SideDrawer from "./SideDrawer";
import Backdrop from "../shared/Backdrop";

const NavLinks: React.FC<{
  mainClass?: string;
  buttonClass?: string;
  closeDrawer: () => void;
}> = ({ mainClass, buttonClass, closeDrawer }) => {
  return (
    <div className={`${mainClass}`}>
      <Link href="/live">
        <span className={`${buttonClass}`} onClick={closeDrawer}>
          <button
            className={`text-xl text-my-white hover:underline underline-offset-4 transition-all`}
          >
            Featured Live Games
          </button>
        </span>
      </Link>
      <Link href="/">
        <span className={`${buttonClass}`} onClick={closeDrawer}>
          <button
            className={`text-xl text-my-white hover:underline underline-offset-4 transition-all`}
          >
            Search Summoner
          </button>
        </span>
      </Link>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawerHandler = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* sidedrawer */}
      {isDrawerOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={isDrawerOpen}>
        <nav className="h-full">
          <NavLinks
            closeDrawer={closeDrawerHandler}
            mainClass="h-full flex flex-col align-center justify-center"
            buttonClass="self-center"
          />
        </nav>
      </SideDrawer>

      <nav className="flex fixed bg-my-black w-full h-16 items-center z-10">
        {/* logo section */}
        <section className="w-3/12">
          <Link href="/">
            <h1 className="cursor-pointer text-my-white text-2xl pl-5">
              Monka League
            </h1>
          </Link>
        </section>
        {/* links section */}
        <section className="flex justify-end w-9/12 pr-5">
          <NavLinks
            closeDrawer={closeDrawerHandler}
            mainClass="hidden sm:flex space-x-5"
          />
          <div
            className="w-12 h-12 cursor-pointer flex flex-col justify-around mr-8 sm:hidden"
            onClick={openDrawerHandler}
          >
            <span className="block w-12 h-[3px] bg-my-white" />
            <span className="block w-12 h-[3px] bg-my-white" />
            <span className="block w-12 h-[3px] bg-my-white" />
          </div>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
