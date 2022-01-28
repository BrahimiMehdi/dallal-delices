
import Link from 'next/link';
import {HiMenuAlt3} from "react-icons/hi"

const Header = ({navState,setNavState}) => {

  return (
      <header  className={`${navState ? "hidden" : "flex"} bg-white-texutre  shadow-md fixed overflow-hidden max-h-[80px]  px-4 sm:px-16 z-20 py-2  w-full items-center justify-between`}>
        <Link href="/">
            <span className="font-semibold cursor-pointer sm:text-2xl text-xl text-mainDark">
                Dallal <h1 className="text-mainPurple inline-block">delices</h1>
            </span>
        </Link>
        <HiMenuAlt3 onClick={setNavState} className="text-mainDark text-3xl sm:text-4xl cursor-pointer" />
      </header>
  )
};

export default Header;
