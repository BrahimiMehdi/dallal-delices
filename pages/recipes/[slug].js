import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { RecipeCard, SideBar, Header } from "../../components";
import { useEffect, useState } from "react";
import { client } from "../../client";
import { userQuery } from "../../services";
import { CgArrowLeftO } from "react-icons/cg";

export default function RecipeDetails({ recipe }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

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
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
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
        <section className="h-screen pl-4 pb-4 max-w-screen grid grid-cols-12   bg-white-texutre bg-contain  grid-rows-1">
          <div className="h-full overflow-hidden relative bg-[#252525] w-full py-2 px-4 pb-8 z-10 bg-cover rounded-b-3xl shadow-2xl  col-span-3  flex flex-col">
            <Link className="z-10 h-[50px]" href="/recipes">
              <CgArrowLeftO className="text-2xl transition-all duration-200 cursor-pointer md:hover:scale-105 md:active:scale-95 h-[150px] z-10 text-mainLight" />
            </Link>
            <img
              className="w-full z-10 rounded-xl shadow-md object-cover object-center h-[300px]"
              src={recipe.imageUrl}
              alt={recipe.title}
            />
            <h1 className="text-2xl z-10 text-center text-secondary-purple font-semibold">
              Ingredients
            </h1>
            <div className="h-full z-10 pl-12 py-8 overflow-y-scroll border-4 border-secondary-purple border-dotted  pr-2 mt-2 rounded-xl scrollbar-hide">
              <ul className="flex flex-col w-full h-full">
                {recipe.ingredients.map((ingredient) => {
                  return (
                    <li className="text-xl font-light leading-12 mt-4 list-decimal text-mainLight">
                      <p>{ingredient}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-span-9 py-8   flex px-20 flex-col justify-around h-full w-full">
            <h1 className="text-5xl text-mainDark mb-8 font-bold capitalize">
              {recipe.title}
            </h1>
            <p className="text-2xl overflow-y-scroll leading-10 border-mainDark border-2 border-dashed rounded-xl px-4 py-8 scrollbar-hide text-mainDark">
              {recipe.about}
            </p>
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
