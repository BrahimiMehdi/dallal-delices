import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect,useRef ,useState } from "react";
import { client } from "../../client";
import { userQuery } from "../../services";
import { CgArrowLeftO } from "react-icons/cg";
import {gsap,Power3} from "gsap"
export default function RecipeDetails({ recipe }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const dishContainer = useRef()
  const mainContent = useRef()
  const tl = gsap.timeline()
  useEffect(() => {
    tl.from(dishContainer.current,{y:"-100%",duration:3,ease:Power3.easeOut},0.3)
      .from(mainContent.current,{opacity:0,duration:1,ease:Power3.easeOut},1)
  }, [])
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
    const doc = {
      _id: session?.user?.id,
      _type: "user",
      userName: session?.user?.name,
      image: session?.user?.image,
    };
    if (status === "authenticated") {
      const query = userQuery(session?.user?.id);

      client.createIfNotExists(doc);
      client.fetch(query).then((data) => {
        setUser(data[0]);
        console.log(user);
      });
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <main className="min-h-screen max-w-screen flex flex-col">
        <Head>
          <title>dallal delices</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="a recipe website containing amazing recipes"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="min-h-screen max-h-[1200px] lg:h-screen  px-4 lg:pl-4 pb-4 max-w-screen grid-rows-2 grid grid-cols-1 lg:grid-cols-12   bg-white-texutre bg-contain  lg:grid-rows-1">
          <div ref={dishContainer} className="h-full overflow-hidden relative bg-[#252525] w-full px-4 pb-8 z-10 bg-cover rounded-b-3xl shadow-2xl  lg:col-span-3  flex flex-col">
            <Link className="z-10 h-[50px]" href="/recipes">
              <CgArrowLeftO className="text-2xl transition-all duration-200 cursor-pointer md:hover:scale-105 md:active:scale-95 h-[150px] z-10 text-mainLight" />
            </Link>
            <img
              className="w-full z-10 rounded-xl shadow-md object-cover object-center mb-4 h-[250px] lg:h-[300px]"
              src={recipe.imageUrl}
              alt={recipe.title}
            />
            <h1 className="text-2xl z-10 text-center text-secondary-purple font-semibold">
              Ingredients
            </h1>
            <div className="h-full py-2 pb-4 border-secondary-purple border-4 pr-2 rounded-xl overflow-hidden border-dotted ">
            <div className="h-full overflow-x-hidden scrollbar scrollbar-track-mainPurple scrollbar-thin scrollbar-thumb-white  z-10 pl-6 py-8 overflow-y-auto   pr-2 mt-2 rounded-xl ">
              <ul className="flex flex-col w-full h-full">
                {recipe.ingredients.map((ingredient,index) => {
                  return (
                    <li key={index} className="text-sm lg:text-lg font-light leading-12 mt-4 list-disc text-mainLight">
                      {ingredient}
                    </li>
                  );
                })}
              </ul>
            </div>
            </div>
          </div>
          <div ref={mainContent} className="lg:col-span-9 py-8   flex lg:px-20 flex-col justify-around h-full w-full">
            <h1 className="text-4xl sm:text-5xl text-mainDark mb-8 font-bold capitalize">
              {recipe.title}
            </h1>
            <div className="h-full pb-4 border-mainDark border-4 pl-2 pr-4 rounded-xl overflow-hidden border-dotted">
            <p className="h-full lg:text-xl text-sm overflow-x-hidden scrollbar scrollbar-track-mainLight scrollbar-thin scrollbar-thumb-mainDark  z-10  pr-4 mt-2 rounded-xl  overflow-y-scroll whitespace-pre-wrap lg:leading-10 leading-10 text-mainDark">
              {recipe.about}
            </p>
            </div>
            
          </div>
        </section>
      </main>
    );
  }
  if (status === "loading") {
    return (
      <main className="min-h-screen max-w-screen bg-white-texutre grid place-items-center">
        <h1 className="text-5xl text-center text-mainDark">Loading...</h1>
      </main>
    );
  }

  return (
    <main className=" bg-white-texutre h-screen w-screen grid place-items-center">
      {signIn()}
    </main>
  );
}
export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "recipe" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const recipe = await client.fetch(
    `
      *[_type == "recipe" && slug.current == $slug][0]{
        slug,
        title,
        ingredients,
        about,
        "imageUrl": image.asset->url,
        _id
        
 
    }
    `,
    { slug }
  );
  return {
    props: {
      recipe,
    },
  };
}
