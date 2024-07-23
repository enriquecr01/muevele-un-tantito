import React from "react";
import "./../App.css";
import { Helmet } from "react-helmet";

const MainMenu = () => {
  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Menu</title>
      </Helmet>
      <div className="w-full">
        <section className="flex flex-col items-center justify-center gap-12 h-screen">
          <h1 className="font-comic text-8xl font-extrabold">
            ¡MUÉVELE TANTITO!
          </h1>
          <div className="flex flex-col items-center w-full gap-1.5">
            <button className="bg-transparent hover:bg-neutral-950/20 text-white py-2 px-4 w-1/2 focus:border-neutral-950/20 hover:ring-orange-600 hover:border-neutral-950/20 active:border-neutral-950/20">
              <span className="drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] text-2xl">
                Jugar
              </span>
            </button>
            <button
              className="bg-transparent hover:bg-neutral-950/20 text-white py-2 px-4 w-1/2 focus:border-neutral-950/20 hover:ring-orange-600 hover:border-neutral-950/20 active:border-neutral-950/20"
              onClick={() => {
                window.close();
              }}
            >
              <span className="drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] text-2xl">
                Salir
              </span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainMenu;
