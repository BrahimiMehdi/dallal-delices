import { getProviders, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { FcGoogle } from "react-icons/fc";
import {AiOutlineHome} from "react-icons/ai"

import Link from "next/link";
const Login = () => {
  const {data:session,status } = useSession();

  return (
    <main className="h-screen w-screen relative grid place-items-center ">
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
      <div className="h-full w-full absolute top-0 bottom-0 left-0 right-0">
        <video
          src="/bgVid.mp4"
          type="video/mp4"
          autoPlay
          controls={false}
          loop
          muted
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex z-10 justify-between h-[250px] items-center flex-col">
        <img className="w-[150px]" src="/Logo.png" alt="" />
        {status==="authenticated" ? (
          <div
            className="flex flex-col items-center justify-between"
          >
            <h1 className="text-xl mb-6 text-center text-mainLight">You Are Logged In</h1>
            <Link
                href="/"
              
              type="button"
             
            >
              <span  className="text-mainDark transition-all md:active:scale-95 shadow-lg duration-300 md:hover:-translate-y-2 cursor-pointer bg-white px-8 py-2 rounded-lg items-center flex justify-between font-semibold"><AiOutlineHome className="text-2xl mr-4" /> Go Home  </span>
              
            </Link>
          </div>
        ) : (

            <div
              key="Google"
              className="flex items-center justify-between"
            >

              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                type="button"
                className="text-mainDark transition-all md:active:scale-95 shadow-lg duration-300 md:hover:-translate-y-2 bg-white px-8 py-2 rounded-lg items-center flex justify-between"
              >
                {" "}
                <FcGoogle /> Login With {"Google"}
              </button>
            </div>
          
        )}
      </div>
      <div className="bg-[rgba(0,0,0,0.6)] absolute top-0 bottom-0 left-0 right-0"></div>
    </main>
  );
};

export default Login;


