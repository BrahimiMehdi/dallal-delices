import { useSession,signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { RecipeCard, SideBar,Header } from "../../components";
import { useEffect, useState } from "react";
import { client } from "../../client";
import { userQuery, getAllRecipes } from "../../services";


export default function Recipes({ recipes }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null)
  const [renderSideBar, setrenderSideBar] = useState(false)
  const [navState, setnavState] = useState(false)
  const changeNav = () => setnavState(!navState)
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

      client.createIfNotExists(doc)
      client.fetch(query).then((data) => {
        setUser(data[0])
        console.log(user)
      })
    }
    
  }, [status])
  useEffect(() => {
    if(user){
      setrenderSideBar(true)
    }
  }, [user]);
  
  
  if (status === "authenticated") {
    return (
      <main className="min-h-screen max-w-screen flex flex-col">
        <Head>
          <title>dallal delices</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" ccrossOrigin="true" />
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
        
        {renderSideBar ? <SideBar navState={navState} changeNav={changeNav} user={user} /> :""}
        
        <Header navState={navState} setNavState={changeNav} />
        <section
          name="/recipesSection"
          className="min-h-screen overflow-hidden bg-recipes-texture relative pt-8 grid place-items-center bg-cover bg-center max-w-screen"
        >
          <div className="min-h-full z-10 w-[90%] place-items-center pb-8 pt-4 grid grid-rows-6 lg:grid-rows-4 grid-cols-1">
            <span className="text-5xl mt-4 sm:text-6xl row-span-1 font-semibold text-mainLight text-center">
              
              Trouvez vos  {" "}
              <h1 className="text-mainPink inline-block">recettes</h1>{" "}
              préférées
            </span>
            <div className="max-h-full gap-8 w-full row-span-5 lg:row-span-3 lg:flex-row lg:flex-wrap flex-col flex justify-center items-center lg:justify-around">
              {recipes.map((recipe, index) => {
                return <RecipeCard key={index} user={user} recipe={recipe} />;
              }) }
            </div>
          </div>
          <div className="min-h-screen w-screen absolute top-0 left-0 bottom-0 bg-opacity-60  bg-black"></div>
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
const getReceps = getAllRecipes();
export async function getStaticProps() {
  const recipes = await client.fetch(getReceps);
  return {
    props: { recipes },
  };
}
