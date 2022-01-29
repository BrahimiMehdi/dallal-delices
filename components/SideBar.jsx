import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiCloseCircleLine } from "react-icons/ri";
import { FiBookmark, FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { signOut } from "next-auth/react";

const SideBar = ({ user, navState, changeNav }) => {
  return (
    <nav
      className={`max-w-screen absolute top-0 bottom-0 left-0 right-0  z-20 h-screen  ${
        navState ? "flex" : "hidden"
      } justify-end items-center`}
    >
      <aside
        className={`flex fixed  flex-col w-[200px] z-30 sm:w-[300px] md:w-[350px] bg-mainLight sm:bg-white-texutre px-8 py-4 h-screen rounded-l-2xl justify-between items-center transition-all duration-500 ${
          navState ? "translate-x-0" : " translate-x-[100%]"
        } `}
      >
        <div className="w-full flex justify-between h-[24px]">
          <RiCloseCircleLine
            onClick={changeNav}
            className="text-2xl transition-all duration-100 md:hover:scale-105 cursor-pointer text-mainDark"
          />
          <Link href="/">
            <AiFillHome className="text-2xl transition-all duration-100 md:hover:scale-105 cursor-pointer text-mainDark" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row border-b-4 pb-2 border-mainDark rounded-lg justify-between w-full items-center">
          <img
            className="w-[75px] h-[75px] rounded-full"
            src={user.image}
            alt={user.userName}
          />
          <h1 className="text-mainDark capitalize sm:md-4 md:mr-12 font-semibold text-sm sm:text-lg whitespace-nowrap">
            {user.userName}
          </h1>
        </div>
        <div className="flex h-[300px] text-mainDark justify-between flex-col w-full">
          <div className="w-full px-8 flex flex-col">
            <div className="h-[250px] w-full flex flex-col flex-grow justify-start"> 
              <Link href="/recipes">
                <span className="inline cursor-pointer border-b-2 border-mainPink transition-all duration-200 md:hover:-translate-y-1 rounded-lg py-2 font-semibold capitalize text-center text-2xl"> 
                  recettes
                </span>
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signOut()}
          className="flex shadow-md py-2 transition-all md:hover:-translate-y-2 bg-mainDark rounded-full px-8 flex-row justify-around items-center w-full"
        >
          <h3 className="text-mainLight">Log Out</h3>
          <FiLogOut className="text-mainLight text-xl" />
        </button>
      </aside>
      <div
        onClick={changeNav}
        className={`w-screen z-20 fixed h-screen  ${
          navState ? "block" : "hidden"
        } bg-[rgba(0,0,0,0.6)]`}
      ></div>
    </nav>
  );
};

export default SideBar;
