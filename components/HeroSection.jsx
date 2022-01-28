import React from "react";
import Link from "next/link";
import { Link as LinkS } from "react-scroll";
import {gsap,Power3} from "gsap"
import { useEffect,useRef } from "react";
const HeroSection = () => {
  const dish = useRef()
  const dishContainer = useRef()
  const mainContent = useRef()
  const tl = gsap.timeline()
  useEffect(() => {
    tl.from(dishContainer.current,{y:"-100%",duration:3,ease:Power3.easeOut})
      .to(dish.current,{rotateZ:180,duration:3,ease:Power3.easeOut},0.2)
      .from(mainContent.current,{opacity:0,duration:1,ease:Power3.easeOut},1)
  }, []);
  
  return (
    <section id="heroSection" className="min-h-screen overflow-hidden scrollbar-hide bg-white-texutre grid place-items-center bg-cover sm:bg-contain bg-center max-w-screen">
      <div className="grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 w-[100%]  sm:pl-8 max-h-full  ">
        <div ref={mainContent} className="h-full p-4 pt-20 pb-20 lg:pt-12 w-full flex flex-col justify-between sm:items-start items-center">
          <span   className="text-mainDark text-center sm:text-left leading-[34px] text-4xl sm:leading-[40px] md:leading-[50px] lg:leading-[64px] lg:text-6xl md:text-5xl sm:text-4xl font-semibold">
            All the recipes <br /> you'll{" "}
            <h1 className="text-mainPink inline-block">ever </h1> need
          </span>
          <p className="font-light sm:text-left sm:text-2xl md:text-3xl my-4 text-center text-mainDark text-xl">
            Compellingly empower client-based value after dynamic solutions.
            Rapidiously pursue virtual leadership through.
          </p>
          <div className="w-full mt-8 place-items-center  grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-6 gap-1 lg:gap-4 ">
            <Link className="grid sm:col-span-2 w-full place-items-center" href="/recipes">
              <button type="button" className="h-[50px] transition-all duration-300 ease-out shadow-lg md:active:scale-95 md:active:bg-mainDark md:active:border-mainDark md:hover:-translate-y-3 w-full md:w-[90%] lg:w-full col-span-2 bg-mainPink border-4 border-mainPink uppercase rounded-full text-center text-mainLight">
                get started
              </button>
            </Link>
            <LinkS className="sm:col-span-4 my-4  min-w-full" to="/recipesSection">
                <button type="button" className="h-[50px] transition-all duration-300 ease-out shadow-lg md:active:scale-95 md:active:bg-white md:hover:-translate-y-3 min-w-full md:w-[90%] lg:w-full border-4 border-mainPink uppercase rounded-full text-center text-mainDark">
                see more
              </button>
            </LinkS>
          </div>
        </div>
        <div ref={dishContainer} className="h-[30%] sm:h-full sm:rounded-b-full sm:border-b-8 sm:border-t-2 sm:border-l-2 sm:shadow-2xl sm:bg-mainPink bg-opacity-80  grid place-items-center w-full">
          <img
            ref={dish}
            className="sm:w-[80%] h-full object-contain  object-center"
            src="/Meal.png"
            alt="picture contains a meal"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
