import React from "react";
import Image from "next/image";

import Link from "next/link";
import {getImageDimensions} from '@sanity/asset-utils'



const RecipeCard = ({ recipe }) => {
  const imageDimensions = getImageDimensions(recipe.imageUrl)
  
  return (
    <div className="h-[400px] mb-2 pb-4 w-[90%] sm:w-[80%] lg:w-[300px] px-4 flex mt-4 justify-around flex-col pt-4 bg-mainLight rounded-2xl shadow-xl">
      
      <Image
        width={imageDimensions.width}
        height={imageDimensions.height}
        layout="responsive"
        className="rounded-xl object-cover h-[250px] "
        src={recipe.imageUrl}
        alt={recipe.title}
      />
      <div className="sm:flex grid mt-4 mb-6 grid-cols-2 place-items-center pl-4 content-center sm:items-center justify-between w-full">
        <h1 className="text-mainDark text-left  text-2xl font-semibold">
          {recipe.title}
        </h1>
        
        

      </div>
      <div className="flex sm:flex-row flex-col-reverse content-center items-center justify-between w-full">
        <Link href={`/recipes/${recipe.slug.current}`}>
          <button
            type="button"
            className="h-[40px] lg:text-base sm:text-sm text-[12px] transition-all duration-300 ease-out shadow-lg md:active:scale-95 md:active:bg-white md:hover:-translate-y-1 w-[100%] md:w-[50%] lg:w-full border-4 border-mainPink uppercase rounded-full text-center text-mainDark"
          >
            see more
          </button>
        </Link>
       {""}
   
      </div>
    </div>
  );
};

export default RecipeCard;
